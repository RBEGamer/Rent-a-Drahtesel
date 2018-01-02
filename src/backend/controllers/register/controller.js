var formdata = require('../../config/formdata');
var c= require('../../config/countries');
var mysqlpool = require('../../config/database.js');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../../config/database');
var sanitizer = require('sanitizer');
var cred = require('../../config/credentials.js');
var formgenerator = require('../../config/formgenerator.js');
var formvalidator = require('../../config/formvalidator.js');
var models = require('../../config/models');
var modelmiddelware = require('../../config/modelmiddelware');

module.exports = function(app, passport, verificationMail) {

	/*var queryBen = "SHOW COLUMNS FROM Benutzer";
	var queryGeschaeft = "SHOW COLUMS FROM Geschaeftsbenutzer";
	var queryPrivat = "SHOW COLUMNS FROM Privatbenutzer";*/

	var forms = formgenerator.generate(['registerprivat', 'registercommercial']);
	/*app.get('/register', function(req, res) {
		res.render('signup.ejs', { 
			layoutPath: '/',
			isLoggedIn: req.isAuthenticated(),
			forms: forms
		});
	});*/

	/*mysqlpool.getConnection(function(err, connection) {
		if (err) {
			console.log("get connection db failed")
			return;
		}
		connection.query(queryBen, function(err, rows) {
			if (err) {
				console.log("get userrole db failed")
				return;
			}
			console.log("base: ");
			console.log(rows);
		});
		connection.release();
	});*/

	/*mysqlpool.getConnection(function(err, connection) {
		if (err) {
			console.log("get connection db failed")
			return;
		}
		connection.query(queryPrivat, function(err, rows) {
			if (err) {
				console.log("get userrole db failed")
				return;
			}
			var string=JSON.stringify(rows);
			var json =  JSON.parse(string);
			for(var i = 0; i < json.length; i++) {
				console.log(json[i].Field);
			}


		});
		connection.release();
	});*/

	/*mysqlpool.getConnection(function(err, connection) {
		if (err) {
			console.log("get connection db failed")
			return;
		}
		connection.query(queryGeschaeft, function(err, rows) {
			if (err) {
				console.log("get userrole db failed")
				return;
			}
			console.log("geschäft: ");
			console.log(rows);
		});
		connection.release();
	});*/

	app.get('/register', function(req, res) {

		var start = req.flash('start');
		var error = req.flash('error');
		var data = req.flash('olddata');

		//console.log('data: ', data);
		//console.log('start: ', start);
		res.render(__dirname +'/register.ejs', { 
			layoutPath: '../../views/',
			isLoggedIn: req.isAuthenticated(),
			data: data[0],
			error: error[0],
			forms: forms,
			start: start
		});
	});

	/*app.post('/register', function(req, res, next) {
		passport.authenticate('local-signup', function(err, user, info){
			if(err) {console.log("error"); return next(err); }
			if(!user) {console.log("error2"); return res.redirect('/register');}
			req.logIn(user, function(err) {
				if(err) {return next(err); }
				req.logout();
				console.log(req.body);
				return res.redirect('/login');
			});
		})(req, res, next);
	});*/

	var benutzerExists = modelmiddelware.itemExists('Benutzer', ['email']);
	app.post('/register', 
		formvalidator.validate, 
		benutzerExists,
		function(req, res, next) {
		
		var invalid = req.flash('invalid')[0];
		console.log("controller - invalid ", invalid);
		if(invalid == 'true') {
			res.redirect('/register');
		} else {
			models.insertIntoModel(req.body.model, req.body, function(data) {
				res.json({data: data});
			});
		}
	});
	app.get('/register/countries', function(req, res, next) {
		res.json(c.countries);	
	});
	
	app.get('/register/style.css', function(req, res, next) {
		res.sendfile(__dirname +'/_style.css');
	});
	app.get('/register/script.js', function(req, res, next) {
		res.sendfile(__dirname+'/_script.js');
	});
}