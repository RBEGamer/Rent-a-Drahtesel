var mysqlpool = require('../../config/database.js');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../../config/database');
var sanitizer = require('sanitizer');
var cred = require('../../config/credentials.js');


module.exports = function(app, passport, verificationMail) {
	app.get('/bike/:id', function(req, res) {
		
		var bikes =[];
		var pictures = [];
		mysqlpool.getConnection(function(err, connection) {
			if (err) {
				console.log("get singlebike db failed")
				return;
			}
			//CHEKC IF PRIVATBENUTZER ->wenn nein dann kein mieten möglich
			var userid = -1;
			if(req.isAuthenticated()){
			var userid = req.session.passport.user;
			}
			connection.query("SELECT * FROM `Privatbenutzer` WHERE `pk_ID` = ? LIMIT 1",[sanitizer.sanitize(userid)], function(err, rows1) {
				if (err) {
					console.log("get singlebike db failed")
					return;
				}
			var privat_benutzer = false;
			if (rows1.length) {
				privat_benutzer = true;
			}
			connection.query("select biketype, size, price, description, porter, childseat, threeday, sevenday, country, city, street, zip, housenumber, lat, lon, name from Fahrrad where pk_id = " + sanitizer.sanitize(req.params.id), function(err, rows) {
				if (err) {
					console.log("get singlebike db failed")
					return;
				}


			//SELECT * FROM `Bestellung` WHERE `pk_ID_Fahrrad`= ?
			connection.query("SELECT `booked_days` FROM `Bestellung` WHERE `pk_ID_Fahrrad`= ?",[sanitizer.sanitize(req.params.id)], function(err, rows2) {
				if (err) {
					console.log("get singlebike db failed")
					return;
				}

				bikes = rows;
				var txt = rows[0].description.substring(0,300);
				connection.query("select picture from Bild where id_fahrrad = " + req.params.id, function(err, rows) {
					if (err) {
						console.log("get singlebi ke pictures db failed")
						return;
					}
					//CONVERTS THE BOOKED DAY FROM DB TO A STRING ARRAY FOR EASY PARSE
					var bkd = [];
					for(var i = 0; i < rows2.length;i++){
						if(rows2[i].booked_days ==  ""){continue;}
						var tmp = rows2[i].booked_days.split(',')
						for(var j = 0; j < tmp.length; j++){
							bkd.push(String(tmp[j]))
						}
					}
						console.log(bkd)
		
					
					pictures = rows;
					console.log(pictures);
					res.render(__dirname +'/singlebike.ejs', { 
					bezeichnung: 'trekkingbike', 
					title: 'singlebike',
					helper: require('../../views/helpers/helper'),
					layoutPath: '../../views/',
					bike: bikes[0],
					pictures: pictures,
					isLoggedIn: req.isAuthenticated() & privat_benutzer,
					maps_key: cred.credentials.google_map_api,
					bike_desc: txt,
					booked_days: bkd
				});
			});
				});
			});
			});
			connection.release();	
		});
	});
}