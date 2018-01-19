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
var formdata = require('../../config/formdata');
var c = require('../../config/countries');

module.exports = function(app, passport, verificationMail) {

	app.get('/editprofile', function(req, res, next) {
		if (!req.isAuthenticated()) {
			res.redirect('/login');
			return;
		}

		var id = req.session.passport.user;
		models.findSpecialisation([ 'Privatbenutzer', 'Geschaeftsbenutzer' ],
				'Benutzer', [ "*" ], {
					pk_ID : id
				}, function(user) {
					var disabled = [];
					var form = "";
					if (user.model === "Privatbenutzer") {
						form = "editprivate";
					}

					if (user.model === "Geschaeftsbenutzer")
						form = "editcommercial";

					var forms = formgenerator.generate([ form ]);
					if(user.model === "Privatbenutzer" && user.data.name_changed === 1) {
						disabled.push('Name');
					}

					if(user.model === "Geschaeftsbenutzer") {
						disabled.push('Firmenname');
					}

					forms[form].disabled = disabled;
					var m = app.locals.formdata;
					var error = (m ? m.error : null);
					var data = (m ? m.olddata : user.data);

					/*if(user.model === "Privatbenutzer" && user.data.name_changed === 1) {
						if(error === null) {
							error = {};
							error.Name = {
								text: "Name",
								error: "Name wurde schon geändert"
							}; 
						} else {
							error.Name = {
								text: "Name",
								error: "Name wurde schon geändert"
							}; 
						}
					}*/

					app.locals.formdata = null;
					data["pw"] = "";
					data["passwortwdh"] = "";
					res.render(__dirname + '/editprofile.ejs', {
						layoutPath : '../../views/',
						isLoggedIn : req.isAuthenticated(),
						data : data,
						error : error,
						forms : forms,
						model : user.model,
						start : form,
						mode : "Update",
						target : 'editprofile',
					});

				});
	});

	app.post('/editprofile', formvalidator.validate, modelmiddelware.hashValue('pw'), function(req, res, next) {
		console.log('kommt an!');
		console.log(res.locals);


		var id = req.session.passport.user;
		if (res.locals.invalid) {
			app.locals.formdata = res.locals;
			res.redirect('/editprofile');
			return;
		} else {

			models.findSpecialisation([ 'Privatbenutzer', 'Geschaeftsbenutzer' ],'Benutzer', [ "*" ], {pk_ID : id}, function(user) {
				console.log(req.body);
				console.log(user.data);
				if(user.model === 'Privatbenutzer') {

				}
				res.json({json: user});
			});

		

		}
	});

	app.post('/delete', function(req, res, next) {
		mysqlpool.getConnection(function(err, connection) {
			if (err) {
				console.log(err);
				return;
			}
			var query = "delete from Benutzer where pk_id = " + sanitizer.sanitize(req.session.passport.user);
			connection.query(query, function(err, rows) {
				if (err) {
					console.log("delete failed")
					return;
				}
			});
			connection.release();
			req.logout();
			res.redirect('/');
		});
	});

}
