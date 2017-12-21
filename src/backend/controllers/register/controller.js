var formdata = require('../../config/register');

module.exports = function(app, passport, verificationMail) {
	app.get('/register', function(req, res) {

		res.render(__dirname +'/register.ejs', { 
			bezeichnung: 'trekkingbike', 
			title: 'singlebike',
			helper: require('../../views/helpers/helper'),
			layoutPath: '../../views/',
			isLoggedIn: req.isAuthenticated(),
			formdata: formdata,
			max: (formdata.commercial.length > formdata.private.length ? formdata.commercial.length : formdata.private.length)
		});
	});

	app.get('/register/form', function(req, res, next) {
		res.json(formdata);
	});

	app.get('/register/style.css', function(req, res, next) {
		res.sendfile(__dirname +'/_style.css');
	});
	app.get('/register/script.js', function(req, res, next) {
		res.sendfile(__dirname+'/_script.js');
	});
}