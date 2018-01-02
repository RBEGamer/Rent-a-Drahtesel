var mysqlpool = require('../../config/database.js');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../../config/database');
var sanitizer = require('sanitizer');
var cred = require('../../config/credentials.js');
var MobileDetect = require('mobile-detect');

module.exports = function(app, passport, verificationMail) {
	app.get('/bike/:id', function(req, res) {
		
		var bikes =[];
		var pictures = [];
		mysqlpool.getConnection(function(err, connection) {
			if (err) {
				console.log("get singlebike db failed")
				return;
			}
			//CHEKC IF PRIVATBENUTZER -> wenn nein dann kein mieten möglich
			var userid = -1;
			if(req.isAuthenticated()){
			var userid = req.session.passport.user;
			}
			connection.query("SELECT * FROM `Privatbenutzer` WHERE `pk_ID` = ? LIMIT 1",[sanitizer.sanitize(userid)], function(err, rows1) {
				if (err) {
					console.log("get singlebike db failed 1")
					return;
				}
			var privat_benutzer = false;
			if (rows1.length) {
				privat_benutzer = true;
			}
			connection.query("select biketype, size, price, description, porter, childseat, threeday, sevenday, country, city,street, zip,pk_ID_Benutzer, housenumber, lat, lon, name from Fahrrad where pk_id = " + sanitizer.sanitize(req.params.id), function(err, rows) {
				if (err) {
					console.log("get singlebike db failed 2")
					return;
				}
				connection.query("SELECT * FROM `Benutzer` WHERE `pk_ID` = " + sanitizer.sanitize(rows[0].pk_ID_Benutzer), function(err, rows4) {
					if (err) {
						console.log("get singlebike db failed 3")
						return;
					}
				console.log(rows4[0])
				connection.query("SELECT  `BewertungFahrrad`.`Rater` AS `rater`,`picture`,`email`,`Rating`,`Description` FROM `BewertungFahrrad` LEFT JOIN `Benutzer` ON `Benutzer`.`pk_ID` = `BewertungFahrrad`.`Rater` WHERE `BewertungFahrrad`.`pk_ID` = ?",[sanitizer.sanitize(req.params.id)], function(err, rows3) {
					if (err) {
						console.log("get singlebike db failed 4")
						return;
					}
			//SELECT * FROM `Bestellung` WHERE `pk_ID_Fahrrad`= ?
			connection.query("SELECT `booked_days` FROM `Bestellung` WHERE `pk_ID_Fahrrad`= ?",[sanitizer.sanitize(req.params.id)], function(err, rows2) {
				if (err) {
					console.log("get singlebike db failed 5")
					return;
				}

				bikes = rows;
				var txt = rows[0].description.substring(0,300);
				connection.query("select picture from Bild where id_fahrrad = " + sanitizer.sanitize(req.params.id), function(err, rows) {
					if (err) {
						console.log("get singlebi ke pictures db failed 6")
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
					booked_days: bkd,
					bike_id: sanitizer.sanitize(req.params.id),
					ratings:rows3,
					user:rows4[0],
					userid: userid
				});
			});
		});
	});
				});
			});
			});
			connection.release();	
		});
	});
	
	app.post('/bike/rent', function(req, res) {
		
		mysqlpool.getConnection(function(err, connection) {
			if (err) {
				console.log("get bike db failed 7")
				console.log(err);
				return;
			}
			var bookeddays = "";
			JSON.parse(req.body.booked_days).forEach(function(day){
				console.log("Day: " + day.date);
				bookeddays += sanitizer.sanitize(day.date) + ',';
			});
			bookeddays = bookeddays.substring(0, bookeddays.length - 1);
			console.log("Days: " + bookeddays);
			console.log("Params: " + JSON.stringify(req.body));
			var q = "INSERT INTO Bestellung (pk_id_Benutzer, pk_ID_Fahrrad, booked_days) VALUES ( " + sanitizer.sanitize(req.session.passport.user) + ", " + sanitizer.sanitize(req.body.bike_id) + ", '" + bookeddays + "')";
			console.log(q);
			connection.query(q, function(err, rows) {
				if (err) {
					console.log("book bike failed 8");
					return;
				}
			});
			connection.release();
			res.redirect('/profile');
		});
	});


	app.post('/bike/delete', function(req, res) {
		if(req.body.user_id == undefined || req.body.inserat_id == undefined){
			console.log("/bike/delte not enogugh arguments")
			res.redirect('/profile');
		}
		//<input type="hidden" name="user_id" value="<%= userid %>" />
		//<input type="hidden" name="inserat_id" value="<%= m.pk_ID %>"/>

		mysqlpool.getConnection(function(err, connection) {
			if (err) {
				console.log("get bike db failed 7")
				console.log(err);
				return;
			}
			
			res.redirect('/profile');
		});
	});
}