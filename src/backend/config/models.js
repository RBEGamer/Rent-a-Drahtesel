var cred  = require('./credentials.js');
var crypto = require('crypto');
var mysqlpool = require('./database');
var sanitizer = require('sanitizer');
var formdata = require('./formdata');
var model = require('./model');
var format = require('./formatstring');
var sqlParser = require('./sqlParser');



function Models(){

	var _models = {};
	var self = this;

	this.getModels = function() {
		return _models;
	}

	this.getValue = function(modelname, field, value) {
		//console.log("models - gatValue - modelname, field, value: ", modelname, field, value);
		var allModels = _models[modelname].subModels;
		for(var i = 0; i < allModels.length; i++) {
			var subModel = _models[modelname].subModels[i];
			for(var j = 0; j < subModel.length; j++) {
				var fieldobj = subModel[j];
				if(fieldobj.Field === field) {
					return sqlParser(fieldobj.Type, value);
				}
			}
		}

	}
	this.dbconnection = function(query, callback) {
		mysqlpool.getConnection(function(err,connection){
        	if (err) {
		  		console.log(err);
				return;
        	}
						
        	connection.query(query, function(err, rows) {	
        		if(err) {
        			console.log(err);
        		}
        		var string=JSON.stringify(rows);
				callback(JSON.parse(string));
        	});
			connection.release();
		});
	}
	this.queryFunctions = function(functions, callback) {
		var results = [];
		this.Waterfall(functions, 
			function(f, ready) {
				f(function(rows) {
					results.push(rows);
					console.log('models- queryfunctions -zwischenergebnisse: ',rows);
					ready();
				});
			},
			function() {
				callback(results);
			});
	}
	this.Waterfall = function(list, iterator, callback) {
		var pos = 0;

		function ready() {
			pos++;
			if(pos == list.length)
				callback();
			else 
				iterator(list[pos], ready);
		}

		iterator(list[0], ready);
	}

	this.getInsertionQuery = function(modelname, data, callback) {

		for(var i = 0; i < _models[modelname].subModels.length; i++) {
			var tmpCols = _models[modelname].subModels[i];
			//console.log(_models[modelname].parent[i]);
			var submodelname = _models[modelname].hierarchie[i];
			var query = "INSERT INTO `" + submodelname + "` ";
			query += "(";
			for(var j = 0; j < tmpCols.length; j++) {
				var field = tmpCols[j].Field;
				//console.log(tmpCols[j].Field + ": " + tmpCols[j].Key + ", " + tmpCols[j].Extra);
				if((data[field] != null && data[field] != "") || (tmpCols[j].Extra != 'auto_increment' && tmpCols[j].Key === 'PRI')) {
					query += field;
					query += ", ";
				}
			}

			query = query.slice(0, -2);
			query += ")";
			query += " VALUES ";
			query += "(";

			for(var j = 0; j < tmpCols.length; j++) {
				var field = tmpCols[j].Field;
				if(data[field] != null  && data[field] != "") {
					query += "'" + data[field] + "'";
					query += ", ";
				}

				if(tmpCols[j].Extra != 'auto_increment' && tmpCols[j].Key === 'PRI') {
					query += " {0} ";
					query += ", ";
				}

				
			}
			query = query.slice(0, -2);
			query += ")";
			callback({query: query, parent: _models[modelname].parent[i]});
		}
	}

	this.getFindCompleteQuery = function(modelname, selects, data) {
		var fields = _models[modelname].fields;
		var hierarchie = _models[modelname].hierarchie;
		var primaryKeys = _models[modelname].primaryKeys;
		var query = "SELECT ";
		for(var i = 0; i < selects.length; i++) {
			query +=  selects[i];
			query += ", ";
		}
		query = query.slice(0, -2);
		query += " FROM ";
		query += hierarchie[0];

		

		for(var i = 1; i < hierarchie.length; i++) {
			query += " JOIN ";
			query += hierarchie[i];
			query += " ON ";
			query += hierarchie[0] + "." + primaryKeys[0];
			query += " = ";
			query += hierarchie[i] + "." + primaryKeys[i];
		}

		query += " WHERE ";

		Object.keys(data).forEach(function(key, index) {
			query += fields[key] + "." + key;
			query += " = ";
			query += self.getValue(fields[key], key, data[key]);
			query += " AND ";
		});

		query = query.slice(0, -5);
		return query;

	}

	this.insertIntoModel = function(modelname, data, callback) {
		//console.log('models - insert into model', data);
		//console.log('models - submodelarray');
		var queries = [];
		var lastID = -1;
		var allRows = [];
		this.getInsertionQuery(modelname, data, function(query) {
			queries.push(query);
		});
		
		this.Waterfall(queries,
			function(query, ready) {

				var finalquery = query.query;
				if(!query.parent) {
					finalquery = format(finalquery, [lastID]);
				}

				self.dbconnection(finalquery, function(rows) {
					if(query.parent) {
						lastID = rows.insertId;
					}
					allRows.push(rows);
					ready();
				});
				
			}, function() {
				callback({lastID: lastID, allRows: allRows});
			}
		);

		
	}

	this.findComplete = function(modelname, selects, data, callback) {
		//SELECT email, city, Vorname FROM benutzer JOIN privatbenutzer ON benutzer.pk_ID = privatbenutzer.pk_ID  WHERE city = 'Aachen' AND Name = 'Arndt';
		console.log('findComplete ');
		var query = this.getFindCompleteQuery(modelname, selects, data);
		this.dbconnection(query, function(rows) {
			callback(rows);
		});	

		
	}

	this.findSpecialisation = function(modelstocheck, basemodel, fields, data, callback) {
		var queries = [];
		var result = {};
		var pos = 0;
		for (var i = 0; i < modelstocheck.length; i++) {
			var tmp = this.getFindCompleteQuery(modelstocheck[i], fields, data);
			queries.push(tmp);
		}

		this.Waterfall(queries, 
			function(query, ready) {
				self.dbconnection(query, function(rows) {
					console.log('modelstocheck, pos: ', modelstocheck, pos);
					if(rows.length > 0) {
						result = {model: modelstocheck[pos], data: rows[0]};
					}
					pos++;
					ready();
				});
			},
			function() {
				callback(result);
			}
		);
	}

	this.findOne = function(modelname, data, callback) {
		var query = "SELECT * FROM `" + modelname + "` WHERE ";
		Object.keys(data).forEach(function(key,index) {
			query += key;
			query += " = ";
			query += self.getValue(modelname, key, data[key]);
			query += " ";
		});
		this.dbconnection(query, function(rows) {
			if(rows.length > 0) {
				//console.log(rows[0]);
				callback(rows);
			}
			else {
				callback(null);
			}
		});
	}

	this.update = function(modelname, data, where, callback) {
		var query = "UPDATE `" + modelname + "` SET ";
		Object.keys(data).forEach(function(key, index) {
			query += key;
			query += " = ";
			query += self.getValue(modelname, key, data[key]);
			query += ", ";
			
		});
		query = query.slice(0, -2);
		query += " WHERE ";
		
		Object.keys(where).forEach(function(key, index) {
			query += key;
			query += " = ";
			query += self.getValue(modelname, key, where[key]);
			query += " AND ";
		});
		query = query.slice(0, -5);
		this.dbconnection(query, function(rows) {
			callback(rows);
		});

		/*this.getValue(modelname, 'verified', 1);
		this.dbconnection("UPDATE `Benutzer` SET `verified`= 1 WHERE `pk_ID` = 57", function(rows) {
			callback(rows);
		});*/

	}

	this.addModel = function(name) {

		var path = [];
		var target = [];
		var tmp = name;
		while(tmp != null) {
			path.push(tmp);
			tmp = formdata.models[tmp].parent;
		}

		/*for(var i = 0; i < path.length; i++) {
			console.log(path[i]);
		}*/

		this.Waterfall(path, 
			function(parent, ready) {
				var query = "SHOW COLUMNS FROM `" + parent + "`";
				self.dbconnection(query, function(rows) {
					target.push(rows);
					ready();
				});
			}, 
			function() {
				var tmpData = {};
				for(var i = path.length -1; i >= 0; i--) {
					tmpData[path[i]] = target[i];
					/*if(_models[path[i]] == null) {
						self.addModel(path[i]);
					}*/
				}
				_models[name] = new model(name, tmpData, path);
				//console.log(tmpData);
			}
		);

	}

	
}



var modelObject = new Models();




module.exports =  modelObject;