var cred  = require('./credentials.js');
var crypto = require('crypto');
var mysqlpool = require('./database');
var sanitizer = require('sanitizer');
var formdata = require('./formdata');


function Model(){

	var _models = {};

	this.WaterfallOver = function(list, iterator, callback) {
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

		for(var i = 0; i < path.length; i++) {
			console.log(path[i]);
		}

		this.WaterfallOver(path, 
			function(parent, ready) {
				mysqlpool.getConnection(function(err,connection){

		        	if (err) {
				  		console.log("passport.deserializeUser db failed")
						return;
		        	}

		        	var data = "SHOW COLUMNS FROM `" + parent + "`";

								
		        	connection.query(data, function(err, rows) {	
		        		if(err) {
		        			console.log(err);
		        		}
		        		var string=JSON.stringify(rows);
		        		console.log(JSON.parse(string));
						target.push(JSON.parse(string));
		        		ready();
		        	});
					connection.release();
				});
			}, 
			function() {
				console.log('ready');
			}
		);

		for(var i = 0; i < target.length; i++) {
			console.log(target[i]);
		}
		/*for(var i = 0;i < path.length; i++) {
			console.log(path[i]);
		}

		this.getModelData(name, function(rows) {
			console.log(rows);
		});*/
	}

	
}



var modelObject = new Model();




module.exports =  modelObject;