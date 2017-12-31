var formdata = require('./formdata');
var functions = require('./formvalidationfunctions');
var formgenerator = require('./formgenerator');
var formvalidator = function()  {
	
	var valide = true;

	this.validate = function(req, res, next) {

		var schema = formdata.forms[req.body.kind].elements;
		var error = {};
		for(var i = 0; i < schema.length; i++) {
			var name = schema[i];
			if(req.body[name] != null) {
				var validationFunctions = formdata.formelements[name].validation;
				if(validationFunctions != null) {
					for(var j = 0; j < validationFunctions.length; j++) {
						var validationObjects = validationFunctions[j];
						var s = "";
						var args = {};
						args.value = req.body[name];
						args.text = formdata.formelements[name].text;
						Object.keys(validationObjects).forEach(function(key,index) {
							if(key === 'name') {
								s = validationObjects[key];
							} 	
							if(key === 'connected') {
								args[key] = req.body[validationObjects[key]];
							}
							else  {
								args[key] = validationObjects[key];
							}
						});
						if(s != "") {
							 var result = functions[s](args);
							 if(!result.value) {
							 	valide = false;
							 	error[name] = {text: args.text, error: result.error};

							 }
						}

					}
				}
			}
		}
		if(!valide) {
			req.flash('error', error);
			req.flash('olddata', req.body);
			req.flash('start', req.body.kind);
			console.log(req.body.kind);
			req.flash('invalid', true);
		} else {
			req.flash('invalid', false);
		}
		
		next();
	}
}

module.exports = new formvalidator();