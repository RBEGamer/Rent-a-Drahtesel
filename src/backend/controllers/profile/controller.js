var mysqlpool = require('../../config/database.js');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../../config/database');
var sanitizer = require('sanitizer');
var cred = require('../../config/credentials.js');

module.exports = function(app, passport, verificationMail) {
	app.get('/profile/:id', function(req, res) {
		var privat = true;
		var user = req.params.id;
		var route = "privatkunde";
		var query = "SELECT `picture`,`Vorname`, `Name`, `phone`, `email`, `city`, `street`, `lat`, `lon`, `housenumber`, `zip`, avg(rating) AS Rating FROM Benutzer AS b JOIN Privatbenutzer AS p ON b.pk_id = p.pk_id JOIN BewertungBenutzer AS bb ON b.pk_id = bb.pk_id WHERE b.pk_id = " + sanitizer.sanitize(user) + " GROUP BY Vorname"
		console.log("Params: " + JSON.stringify(req.params))
		console.log("User: " + user);
		mysqlpool.getConnection(function(err, connection) {
			if (err) {
				console.log("get connection db failed")
				res.redirect('/');//TODO ADD FLASH MESSAGE
				return;
			}
			connection.query("Select count(*) as anz FROM Privatbenutzer WHERE pk_ID = " + sanitizer.sanitize(user), function(err, rows) {
				if (err) {
					console.log("get userrole db failed")
					res.redirect('/');//TODO ADD FLASH MESSAGE
					return;
				}
				if(rows[0].anz == 0){
					route = "geschaeftskunde";
					query = "SELECT `picture`,`Banner`, `WebUrl`, `FacebookUrl`, `TwitterUrl`, `InstagramUrl`,`Firmenname`,`phone`, `email`, `city`, `street`, `lat`, `lon`, `housenumber`, `zip`, avg(rating) AS Rating FROM `Benutzer` AS b JOIN `Geschaeftsbenutzer` AS p ON b.pk_id = p.pk_id JOIN `BewertungBenutzer` AS bb ON b.pk_id = bb.pk_id WHERE b.pk_id = " + sanitizer.sanitize(user) + " GROUP BY `Firmenname`";
	}
				connection.query(query, function(err, rows) {
					if (err) {
						console.log("get user db failed")
						res.redirect('/');//TODO ADD FLASH MESSAGE
						return;
					}
					//console.log(rows);
					userdata = rows[0];
						console.log(sanitizer.sanitize(user))
					connection.query("SELECT * FROM `BewertungBenutzer`  LEFT JOIN `Benutzer` ON `Benutzer`.`pk_ID` = `BewertungBenutzer`.`pk_ID` WHERE `Benutzer`.`pk_ID` = '" + sanitizer.sanitize(user) +"'", function(err, rows4) {
						if (err) {
							console.log("get user db failed 3");
							res.redirect('/');//TODO ADD FLASH MESSAGE
							return;
						}
				console.log(rows4)
					res.render(__dirname + '/' + route + '.ejs',
							{
								helper : require('../../views/helpers/helper'),
								layoutPath : '../../views/',
								isLoggedIn : req.isAuthenticated(),
								userdata: userdata,
								maps_key: cred.credentials.google_map_api,
								ratings: rows4
							});
						});
				});
			});
			connection.release();
		});
	});

	app.get('/profile', function(req, res) {
		var user = req.session.passport.user;
		var bookings = [];
		var route = "selfprivatkunde";
		var query = "SELECT `picture`,`Vorname`, `Name`, `phone`, `email`, `city`, `street`, `lat`, `lon`, `housenumber`, `zip`, avg(rating) AS Rating FROM Benutzer AS b JOIN Privatbenutzer AS p ON b.pk_id = p.pk_id JOIN BewertungBenutzer AS bb ON b.pk_id = bb.pk_id WHERE b.pk_id = " + sanitizer.sanitize(user) + " GROUP BY Vorname";
		console.log(req.session);
		mysqlpool.getConnection(function(err, connection) {
			if (err) {
				console.log("get connection db failed 0")
				return;
			}
			console.log("USER " + user); //#TODO CHECK USER
			connection.query("Select COUNT(*) as anz FROM `Privatbenutzer` WHERE `pk_ID` = ?",[sanitizer.sanitize(user)], function(err, rows) {
				if (err) {
					console.log("get userrole db failed 1")
					res.redirect('/');//TODO ADD FLASH MESSAGE
					return;
				}
				if(rows[0].anz <= 0){
					route = "selfgeschaeftskunde";
					console.log("self gesch")
					query = "SELECT `picture`,`Banner`, `WebUrl`, `FacebookUrl`, `TwitterUrl`, `InstagramUrl`,`Firmenname`,`phone`, `email`, `city`, `street`, `lat`, `lon`, `housenumber`, `zip`, avg(rating) AS Rating FROM `Benutzer` AS b JOIN `Geschaeftsbenutzer` AS p ON b.pk_id = p.pk_id JOIN `BewertungBenutzer` AS bb ON b.pk_id = bb.pk_id WHERE b.pk_id = " + sanitizer.sanitize(user) + " GROUP BY `Firmenname`";
				}
				connection.query(query, function(err, rows) {
					if (err) {
						console.log("get user db failed 2");
						res.redirect('/');//TODO ADD FLASH MESSAGE
						return;
					}
					//console.log(rows);
					userdata = rows[0];
					//TOD IMAGE DATA

					
					//
					connection.query("SELECT * FROM `BewertungBenutzer`  LEFT JOIN `Benutzer` ON `Benutzer`.`pk_ID` = `BewertungBenutzer`.`pk_ID` WHERE `Benutzer`.`pk_ID` = '" + sanitizer.sanitize(user) +"'", function(err, rows4) {
						if (err) {
							console.log("get user db failed 3");
							res.redirect('/');//TODO ADD FLASH MESSAGE
							return;
						}
						
						connection.query("SELECT * FROM `Fahrrad` WHERE `pk_ID_Benutzer` = '" + sanitizer.sanitize(user) +"'", function(err, rows5) {
							if (err) {
								console.log("get user db failed 4");
								res.redirect('/');//TODO ADD FLASH MESSAGE
								return;
							}
							console.log(rows5);
							console.log("-------------------------------")
							
							rows5.forEach(n => {
								console.log(n.pk_ID)
								connection.query("SELECT * FROM `Bestellung` LEFT JOIN `Benutzer` ON `Benutzer`.`pk_ID` = `Bestellung`.`pk_ID_Benutzer` WHERE `pk_ID_Fahrrad` = '" + n.pk_ID + "'", function(err, resu) {
								if (err) {
									console.log("get user db failed 5");
									return;
								}
								//TODOFIX
								console.log(resu);
								resu.forEach(m => {
									console.log("bla");
									bookings.push({booked_days:m.booked_days,userid:m.pk_ID,rent_date:m.Rentdate,email:m.email, bike_id:n.pk_ID})
									console.log({booked_days:m.booked_days,userid:m.pk_ID,rent_date:m.Rentdate, email:m.email, bike_id:n.pk_ID})
								});
							});
							
						});
							
							//TODO FIX
							console.log("bk" + bookings)

					res.render(__dirname + '/' + route + '.ejs',
							{
								helper : require('../../views/helpers/helper'),
								layoutPath : '../../views/',
								isLoggedIn : req.isAuthenticated(),
								userdata: userdata,
								maps_key: cred.credentials.google_map_api,
								ratings: rows4,
								bikes: rows5,
								userid: sanitizer.sanitize(user),
								bookings: bookings
							});
						});
					
					});
				});
			});
			connection.release();
		});
		
	});




	app.get('/profile/edit', function(req, res) {
			res.redirect('/profile');
			//TODO 
	});

}