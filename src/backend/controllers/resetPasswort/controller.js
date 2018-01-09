var nodemailer = require("nodemailer");
var cred  = require('../../config/credentials.js');
var crypto = require('crypto');
var mysqlpool = require('../../config/database');
var sanitizer = require('sanitizer');
var bsip = require('../../config/base_ip.js')
var bsip = require('../../config/verificationMail.js')
var randomstring = require("randomstring");
var bcrypt = require('bcrypt-nodejs');


module.exports = function(app, passport, verificationMail) {
	app.get('/reset', function(req, res) {
		res.render(__dirname +'/resetPasswort.ejs', { 
			helper: require('../../views/helpers/helper'),
			layoutPath: '../../views/',
			isLoggedIn : req.isAuthenticated(),
			message: req.flash('loginMessage'),
		});
	});



	app.post('/reset', function(req, res) {
		if(req.body.mail == null){
			console.log("MAIL == NULL")
		res.render(__dirname +'/resetPasswort.ejs', { 
			helper: require('../../views/helpers/helper'),
			layoutPath: '../../views/',
			isLoggedIn : req.isAuthenticated(),
			mail_succ: false,
			message: req.flash('loginMessage'),
		});
	}else{
		
		mysqlpool.getConnection(function(err,connection){
            if (err) {
			  console.log("passport.deserializeUser db failed")
			  req.flash('loginMessage', 'Es ist ein allgemeiner Fehler aufgetreten. Bitte probiere es erneut');
			  res.render(__dirname +'/resetPasswort.ejs', { 
				helper: require('../../views/helpers/helper'),
				layoutPath: '../../views/',
				isLoggedIn : req.isAuthenticated(),
				mail_succ: false,
				message: req.flash('loginMessage'),
			});
			return;
            }
			
        connection.query("SELECT * FROM `Benutzer` WHERE `verified`='1' AND `email`=? LIMIT 1", [sanitizer.sanitize(req.body.mail)], function(err, rows) {
		   console.log(rows);
		   if (rows.length == 1) {
			req.flash('loginMessage', 'MAIL SEND');
			var transp = nodemailer.createTransport("smtps://rent.a.drahtesel%40gmail.com:"+encodeURIComponent('softwarea8') + "@smtp.gmail.com:465");
			var pw = randomstring.generate(7);
			var pw_hash = bcrypt.hashSync(pw, null, null)
			console.log("NEW USER PW:" + pw + " HASH:" + pw_hash);
			connection.query("UPDATE `Benutzer` SET `pw`=? WHERE `email`= ? LIMIT 1", [sanitizer.sanitize(pw_hash),sanitizer.sanitize(req.body.mail)], function(err, rows) {
				req.flash('loginMessage', 'Wir haben eine Email mit einem neuen Passwort an  ' + req.body.mail + ' gesendet. Bitte aendere dies bei deinem naesten Besuch.<br>Bitte Antworte nicht auf diese E-Mail.<br>Viele Gruesse dein Rent-A-Bike Team.');
				verificationMail.sendMailMSG("Hallo,<br> dein neues Passwort lautet : "+ pw + "<br>", req.body.mail);
				req.flash('loginMessage', 'Eine Email mit deinem neuen Passwort wurde versand!');
			});
			
		   }else{
			req.flash('loginMessage', 'Es konnte kein Benutzer mit dieser Email-Adresse gefunden werden.');
		   }

        });
		connection.release()
		res.render(__dirname +'/resetPasswort.ejs', { 
			helper: require('../../views/helpers/helper'),
			layoutPath: '../../views/',
			isLoggedIn : req.isAuthenticated(),
			mail_succ: false,
			message: req.flash('loginMessage'),
		});
		});
		


	}
	});


}