var formdata = require('./formdata');
var functions = require('./formvalidationfunctions');
var formgenerator = require('./formgenerator');

var formvalidator = function()  {
	

	this.validate = function(req, res, next) {
		//console.log('FORMDATA 4', formdata);
		//console.log(req.body.kind);
		var valide = true;

		//var schema = formdata.forms[req.body.kind].elements;
		var schema = req.body.formvalidatorschema;
		var elements = req.body.elements; 
		var error = {};
		for(var i = 0; i < schema.length; i++) {
			var name = schema[i];
			console.log(name);
			if(req.body[name] != null) {
				var validationFunctions = elements[name].validation;
				if(validationFunctions != null) {
					for(var j = 0; j < validationFunctions.length; j++) {
						var validationObjects = validationFunctions[j];
						var s = "";
						var args = {};
						args.value = req.body[name];
						args.text = elements[name].text;
						var targets = null;
						
						Object.keys(validationObjects).forEach(function(key,index) {
							if(key === 'name') {
								s = validationObjects[key];
							} 	
							if(key === 'connected') {
								var field = validationObjects[key];
								args[key] = {};
								args[key].value = req.body[field];
								args[key].text = elements[field].text;
							}
							else if(key === 'inhibitor') {

							}
							else if(key === 'target') {
								targets = [];
								var tmpTargets = validationObjects[key];
								for(var k = 0; k < tmpTargets.length; k++) {
									targets.push(tmpTargets[k]);
								}
							}
							else  {
								args[key] = validationObjects[key];
							}
						});
						if(s != "") {
							 var result = functions[s](args);
								if(!result.value) {
									valide = false;
									if(targets != null) {
										for(var k = 0; k < targets.length; k++) {
											error[targets[k]] = {text: elements[targets[k]].text, error: result.error};
										}
									} else {
										error[name] = {text: args.text, error: result.error};
									}
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