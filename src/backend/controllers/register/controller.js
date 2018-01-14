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
var bsip = require('../../config/base_ip.js');



module.exports = function(app, passport, verificationMail) {


	var forms = formgenerator.generate(['registerprivat', 'registercommercial']);


	app.get('/register/debug', function(req, res) {


		var id = req.session.passport.user;
		models.findSpecialisation(
			['Privatbenutzer', 'Geschaeftsbenutzer'], 
			'Benutzer',
			['*'],
			{pk_ID: id},
			function(user) {

				var queries = [
					function(callback) { models.findComplete('BewertungBenutzer', ["*"], {pk_ID: user.data.pk_ID}, callback);},
			 		function(callback) { models.findComplete('Fahrrad', ["*"], {pk_ID_Benutzer: user.data.pk_ID}, callback);}
				];
				models.queryFunctions(queries, function(results) {
					res.json({results: results, user: user});
				});

			}
		);
		/*function show2() {console.log("show2")};
		function show3() {console.log("show3")};
		var functions = [show2, show3];
		for(var i = 0; i < functions.length; i++) {
			functions[i]();
		}*/

	

	});

	app.get('/register', function(req, res) {

		

		var m =  app.locals.formdata;
		console.log("FORMDATA 1" , formdata);
		var data = (m ? m.olddata  : {});
		var start = (m ? m.start : "");
		var invalid = (m ? m.invalid : false);
		var error = (m ? m.error : null);
		app.locals.formdata = null;
		console.log("FORMDATA 2", formdata);
		res.render(__dirname +'/register.ejs', { 
			layoutPath: '../../views/',
			isLoggedIn: req.isAuthenticated(),
			data: data,
			error: error,
			forms: forms,
			start: start,
			target: 'register'
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
	console.log("FORMDATA 3", formdata);

	app.post('/register', 
		formvalidator.validate, 
		benutzerExists,
		hashPassword,
		insertHash,
		function(req, res, next) {
			//res.json({data: data});
		

			if(res.locals.invalid) {
				app.locals.formdata = res.locals;
				app.locals.formdata.olddata.pw = "";
				app.locals.formdata.olddata.passwortwdh = "";
				if(res.locals.findOne.found) {
					app.locals.formdata.error.email = {text: "Email*", error: "Diese Emailadresse wird bereits verwendet! Wir haben dir eine email fuer den Passwort reset gesendet"};

					verificationMail.sendMailMSG(
						"Hallo Rent-A-Bike Benutzer, <br> Du hast dich bereit mit dieser Email-Adresse registriert. Dein Passwort kannst du hier zurücksetzten: <a href='"+bsip+"reset'>Reset Passwort</a> <br> Bitte Antworte nicht auf diese E-Mail. <br> Viele Gruesse dein Rent-A-Bike Team.",
						req.body['email']
					);



				}
				res.redirect('/register');
			} else {
				
				models.insertIntoModel(req.body.model, req.body, function(data) {
					
					verificationMail.sendMailMSG(
						"Hallo Rent-A-Bike Benutzer, <br> Bitte klicke innerhalb von 24h <a href='"+bsip+"register/verification/" + data.lastID + "/" + req.body.verification_hash + "'>Activate</a> um deinen Rent-A-Bike Account zu aktivieren.<br> Bitte Antworte nicht auf diese E-Mail. <br> Viele Gruesse dein Rent-A-Bike Team.",
						req.body['email']
					);
					req.flash('loginMessage', 'Wir haben eine Email an ' + req.body['email'] + ' geschickt. Bitte befolge die Anweisungen, um deinen Account zu aktivieren.');
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

        		if(cols[0].verification_hash === hash) {
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