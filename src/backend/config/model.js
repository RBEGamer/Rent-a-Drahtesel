var cred  = require('./credentials.js');
var crypto = require('crypto');
var mysqlpool = require('./database');
var sanitizer = require('sanitizer');
var formdata = require('./formdata');


function Model(){

	var _models = {};
	var self = this;
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

	this.getModelData = function(tablename, callback) {
		
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
				console.log(parent);
				var query = "SHOW COLUMNS FROM `" + parent + "`";
				self.dbconnection(query, function(rows) {
					target.push(rows);
					ready();
				});
			}, 
			function() {
				_models[name] = {};
				for(var i = path.length -1; i >= 0; i--) {
					_models[name][path[i]] = target[i];
				}
				console.log(_models);
			}
		);

	}

	
}



var modelObject = new Model();




module.exports =  modelObject;