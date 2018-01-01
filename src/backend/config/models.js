var cred  = require('./credentials.js');
var crypto = require('crypto');
var mysqlpool = require('./database');
var sanitizer = require('sanitizer');
var formdata = require('./formdata');
var model = require('./model');


function Models(){

	var _models = {};
	var self = this;

	this.getModels = function() {
		return _models;
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
			var submodelname = _models[modelname].hierarchie[i];
			var query = "INSERT INTO `" + submodelname + "` ";
			query += "(";
			for(var j = 0; j < tmpCols.length; j++) {
				var field = tmpCols[j].Field;
				if(data[field] != null && data[field] != "") {
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
					query += data[field];
					query += ", ";
				}
			}
			query = query.slice(0, -2);
			query += ")";
			callback(query);
		}
	}

	this.insertIntoModel = function(modelname, data, callback) {
		console.log('models - insert into model', data);
		console.log('models - submodelarray');
		this.getInsertionQuery(modelname, data, function(query) {
			console.log(query);
		});
		callback(true);

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
				}
				_models[name] = new model(name, tmpData, path);
			}
		);

	}

	
}



var modelObject = new Models();




module.exports =  modelObject;