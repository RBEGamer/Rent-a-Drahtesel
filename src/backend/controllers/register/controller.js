var formdata = require('../../config/register');
var c= require('../../config/countries');
module.exports = function(app, passport, verificationMail) {
	app.get('/register', function(req, res) {
		res.render(__dirname +'/register.ejs', { 
			bezeichnung: 'trekkingbike', 
			title: 'singlebike',
			helper: require('../../views/helpers/helper'),
			layoutPath: '../../views/',
			isLoggedIn: req.isAuthenticated(),
			formdata: formdata,
			countries: c.countries,
			max: (formdata.commercial.length > formdata.private.length ? formdata.commercial.length : formdata.private.length)
		});
	});

	app.post('/register', function(req, res, next) {
		passport.authenticate('local-signup', function(err, user, info){
			if(err) {console.log("error"); return next(err); }
			if(!user) {console.log("error2"); return res.redirect('/register');}
			req.logIn(user, function(err) {
				if(err) {return next(err); }
				req.logout();
				//console.log(req.body);
				return res.redirect('/login');
			});
		})(req, res, next);
	});
	app.get('/register/form', function(req, res, next) {
		res.json(formdata)	
	});

	app.get('/register/style.css', function(req, res, next) {
		res.sendfile(__dirname +'/_style.css');
	});
	app.get('/register/script.js', function(req, res, next) {
		res.sendfile(__dirname+'/_script.js');
	});
}