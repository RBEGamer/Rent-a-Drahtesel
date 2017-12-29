var formdata = require('../../config/register');
var c= require('../../config/countries');
var formqueries = null;
var mysqlpool = require('../../config/database.js');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../../config/database');
var sanitizer = require('sanitizer');
var cred = require('../../config/credentials.js');

module.exports = function(app, passport, verificationMail) {

	var queryBen = "SHOW COLUMNS FROM Benutzer";
	var queryGeschaeft = "SHOW COLUMS FROM Geschaeftsbenutzer";
	var queryPrivat = "SHOW COLUMNS FROM Privatbenutzer";

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

	mysqlpool.getConnection(function(err, connection) {
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
	});

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
				console.log(req.body);
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