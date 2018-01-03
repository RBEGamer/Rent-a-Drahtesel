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
var bsip = require('../../config/base_ip.js')


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

		/*var start = req.flash('start');
		var error = req.flash('error');
		var data = req.flash('olddata');
		console.log(req.flash());
		console.log(res.locals);
		//console.log('data: ', data);
		//console.log('start: ', start);*/

		var m =  app.locals.formdata
		console.log('register get ', app.locals.formdata);
		var data = (m ? m.olddata  : {});
		var start = (m ? m.start : "");
		var invalid = (m ? m.invalid : false);
		var error = (m ? m.error : null);
		app.locals.formdata = null;
		res.render(__dirname +'/register.ejs', { 
			layoutPath: '../../views/',
			isLoggedIn: req.isAuthenticated(),
			data: data,
			error: error,
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
	var hashPassword = modelmiddelware.hashValue('pw');
	var insertHash = modelmiddelware.updateReqBody(['verified', 'verification_hash'], ['0', verificationMail.getHash(4)]);
	app.post('/register', 
		formvalidator.validate, 
		benutzerExists,
		hashPassword,
		insertHash, 
		function(req, res, next) {
			//res.json({data: data});
			console.log(req.body);
			if(res.locals.findOne.found) {
				res.locals.invalid = true;
				res.locals.error = {};
				req.body['pw'] = "";
				req.body['passwortwdh'] = "";
				res.locals.data = req.body;
				res.locals.error['email'] = {text: 'Email*', error: 'Die Email Adresse ist schon vergeben!'};
			}

			if(res.locals.invalid) {
				app.locals.formdata = res.locals;
				console.log(res.locals);
				res.redirect('/register');
			} else {

				models.insertIntoModel(req.body.model, req.body, function(data) {
					
					verificationMail.sendMailMSG(
						"Hallo Rent-A-Bike Benutzer, <br> Bitte klicke innerhalb von 24h <a href='"+bsip+"register/verification/" + data.lastID + "/" + req.body.verification_hash + "'>Activate</a> um deinen Rent-A-Bike Account zu aktivieren.<br> Bitte Antworte nicht auf diese E-Mail. <br> Viele Gruesse dein Rent-A-Bike Team.",
						req.body['email']
					);
					req.flash('loginMessage', 'Wir haben eine Email an ' + req.body['email'] + ' geschickt. Befolgen Sie den Anweisungen sofort. Schalten Sie nicht die Polizei ein. Die Email wird sich um 0:00 selber löschen.');
					res.redirect('/login');
				});
			}
		/*var invalid = req.flash('invalid')[0];
		console.log("controller - invalid ", invalid);
		if(invalid == 'true') {
			res.redirect('/register');
		} else {
			models.insertIntoModel(req.body.model, req.body, function(data) {
				res.json({data: data});
			});
		}*/
	});

	app.get('/register/verification/:id/:hash', function(req, res, next) {
		var id = parseInt(req.params.id);
        var hash = req.params.hash;
        var loginMessage = '';
        models.findOne('Benutzer', {pk_ID: id}, function(cols) {
        	if(cols) {
        		console.log(cols.verification_hash);
        		console.log(hash);
        		if(cols.verification_hash === hash) {
        			models.update('Benutzer', {verified: '1'}, {pk_ID: id}, function(rows) {
        				//console.log(rows.model.Benutzer);
        				//res.json({data: rows});
        				req.flash('loginMessage', 'Sie können sich nun einloggen.');
        				res.redirect('/login');
        			});
        		} else {
        			req.flash('loginMessage', "Verification hat nicht geklappt");
        			res.redirect('/login');
        		}
        	} else {
        		req.flash('loginMessage', "Verification hat nicht geklappt");
        		res.redirect('/login');
        	}
        });
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