var formdata = require('./formdata');
var functions = require('./formvalidationfunctions');
var formgenerator = require('./formgenerator');

var formvalidator = function()  {
	

	this.validate = function(req, res, next) {
		
		console.log(req.body.kind);
		var valide = true;

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
								var field = validationObjects[key];
								args[key] = {};
								args[key].value = req.body[field];
								args[key].text = formdata.formelements[field].text;
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
		res.locals.error = error;
		res.locals.olddata = req.body;
		res.locals.start = req.body.kind;
		res.locals.invalid = !valide
		next();
	}

}

module.exports = new formvalidator();