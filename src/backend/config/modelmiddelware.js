var models = require('./models');
var forms =  require('./formdata');

function itemExists(modelname, data) {
	return function(req, res, next) {

		if(req.flash('invalid') === 'true') {
			req.flash('invalid','true');
			next();
		} else {
			var columns = {};
			for(var i = 0; i < data.length; i++) {
				columns[data[i]] = req.body[data[i]];
			}
			models.findOne(modelname, columns, function(response) {
				console.log(response);
				console.log(req.flash('invalid'));
				if(response.length === 0) {
					req.flash('invalid', 'false');
				}
				else {
					var error = {};
					error[data[0]] = {text: forms.formelements[data[0]].text, error: "Schon vorhanden!"};
					req.flash('invalid', 'true');
					req.flash('error', error);
					req.flash('olddata', req.body);
					req.flash('start', req.body.kind);

				}
				next();
			});
		}
		
	};
}


module.exports =  {
	itemExists: itemExists

}