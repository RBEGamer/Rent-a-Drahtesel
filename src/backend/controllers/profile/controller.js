var mysqlpool = require('../../config/database.js');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../../config/database');
var sanitizer = require('sanitizer');
var cred = require('../../config/credentials.js');
var models = require('../../config/models');

module.exports = function(app, passport, verificationMail) {
	app.get('/profile/:id', function(req, res) {
		var privat = true;
		var user = req.params.id;
		var route = "privatkunde";
		var query = "SELECT `picture`,`Vorname`, `Name`, `phone`, `email`, `city`, `street`, `lat`, `lon`, `housenumber`, `zip`, avg(rating) AS Rating FROM Benutzer AS b JOIN Privatbenutzer AS p ON b.pk_id = p.pk_id JOIN BewertungBenutzer AS bb ON b.pk_id = bb.pk_id WHERE b.pk_id = " + sanitizer.sanitize(user) + " GROUP BY Vorname"
	//	console.log("Params: " + JSON.stringify(req.params))
	//	console.log("User: " + user);
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
					//	console.log(sanitizer.sanitize(user))
					connection.query("SELECT * FROM `BewertungBenutzer`  LEFT JOIN `Benutzer` ON `Benutzer`.`pk_ID` = `BewertungBenutzer`.`pk_ID` WHERE `Benutzer`.`pk_ID` = '" + sanitizer.sanitize(user) +"'", function(err, rows4) {
						if (err) {
							console.log("get user db failed 3");
							res.redirect('/');//TODO ADD FLASH MESSAGE
							return;
						}
			//	console.log(rows4)
						console.log("PROFILE", userdata);
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
		var id = req.session.passport.user;
		//JOIN BewertungBenutzer  ON Benutzer.pk_id = BewertungBenutzer.pk_id
		if(id == undefined){res.redirect('/');}
		models.findSpecialisation(
			['Geschaeftsbenutzer', 'Privatbenutzer'], 
			'Benutzer',
			['*'],
			{pk_ID: id},
			function(user) {



				var bewertungenbenutzer =  function(callback) { models.findComplete('BewertungBenutzer', ["*"], {pk_ID: user.data.pk_ID}, [{model: 'Benutzer', target: 'Rater', destination: 'pk_ID'}],callback);};
				var bikes  = function(callback) { models.findComplete('Fahrrad', ["*"], {pk_ID_Benutzer: user.data.pk_ID}, [], callback);};
				var bestellungen = function(callback) { models.findComplete('Bestellung', ["*"], {}, [{model: 'Benutzer', target: 'pk_ID_Benutzer', destination: 'pk_ID'}], callback);};
				//SELECT *, `Benutzer`.`pk_ID` AS `userid` FROM `Bestellung` JOIN `Fahrrad` ON `Fahrrad`.`pk_ID` = `Bestellung`.`pk_ID_Fahrrad` JOIN `Benutzer` ON `Benutzer`.`pk_ID` = `Fahrrad`.`pk_ID_Benutzer` WHERE `Bestellung`.`pk_ID_Benutzer`= 57
				var own_bestellungen = function(callback) {models.findComplete('Bestellung', ["*"], {pk_ID_Benutzer: user.data.pk_ID}, [{model: 'Fahrrad', target: 'pk_ID_Fahrrad', destination: 'pk_ID'}, {targetmodel: 'Benutzer', target: 'pk_ID', destinationmodel: 'Fahrrad', destination: 'pk_ID_Benutzer' }], callback); };
				var own_rating = function(callback) {models.findComplete('BewertungBenutzer', ["avg(rating) AS Rating"], {pk_ID: user.data.pk_ID}, [], callback);};
				//
				/*var elements = [{model: 'Benutzer', target: 'pk_ID_Benutzer', destination: 'pk_ID'}];
				var elements1 = [{model: 'Fahrrad', target: 'pk_ID_Fahrrad', destination: 'pk_ID'}, {targetmodel: 'Benutzer', target: 'Benutzer.pk_ID', destination: 'Fahrrad.pk_ID_Benutzer' }];
				var query = models.getFindCompleteQuery('Bestellung', ["*"], [{model: 'Benutzer', target: 'pk_ID_Benutzer', destination: 'pk_ID'}], {pk_ID_Benutzer: user.data.pk_ID});
				//SELECT *, `Benutzer`.`pk_ID` AS `userid` FROM `Bestellung`  LEFT JOIN `Fahrrad` ON `Fahrrad`.`pk_ID` = `Bestellung`.`pk_ID_Fahrrad` LEFT JOIN `Benutzer` ON `Benutzer`.`pk_ID` = `Fahrrad`.`pk_ID_Benutzer` WHERE `Bestellung`.`pk_ID_Benutzer`='"
				
				var query1 = models.getFindCompleteQuery('Bestellung', ["*"], [{model: 'Fahrrad', target: 'pk_ID_Fahrrad', destination: 'pk_ID'}, {targetmodel: 'Benutzer', target: 'Benutzer.pk_ID', destination: 'Fahrrad.pk_ID_Benutzer' }], {pk_ID_Benutzer: user.data.pk_ID});
				res.json({query: query, query1: query1});*/																													
				
				var querieObject = {
					own_bestellungen: own_bestellungen,
					bikes: bikes,
					bestellungen: bestellungen,
					bewertungenbenutzer: bewertungenbenutzer,
					own_rating: own_rating
				}
				
				/*var queries = [
					function(callback) { models.findComplete('BewertungBenutzer', ["*"], {pk_ID: user.data.pk_ID}, [{model: 'Benutzer', target: 'pk_ID_Benutzer', destination: 'pk_ID'}],callback);},
			 		function(callback) { models.findComplete('Fahrrad', ["*"], {pk_ID_Benutzer: user.data.pk_ID}, [], callback);},
			 		function(callback) { models.findComplete('Bestellung', ["*"], {}, [{model: 'Benutzer', target: 'pk_ID_Benutzer', destination: 'pk_ID'}], callback);}
				];*/

				var route = "selfprivatkunde";
				if(user.model === "Geschaeftsbenutzer") route = "selfgeschaeftskunde";
				models.queryFunctions(querieObject, function(results) {
					console.log("OOOOOOOOOOOOOOOOOOOOOO");
					console.log(results.own_rating);
					console.log("OOOOOOOOOOOOOOOOOOOOOO");
					res.render(__dirname + '/' + route + '.ejs',
						{
							helper : require('../../views/helpers/helper'),
							layoutPath : '../../views/',
							isLoggedIn : req.isAuthenticated(),
							userdata: user.data,
							maps_key: cred.credentials.google_map_api,
							ratings: results.bewertungenbenutzer,
							bikes: results.bikes,
							userid: sanitizer.sanitize(user),
							bookings: results.bestellungen,
							own_bookings: results.own_bestellungen,
							own_rating: results.own_rating[0],
							userid: sanitizer.sanitize(id),
						}
					);
							
				});

				/*console.log("result in controller: ", [{model: 'Benutzer', target: 'pk_ID_Benutzer', destination: 'pk_ID'}]);
				var joins = models.generateJoins('BewertungBenutzer', [{model: 'Benutzer', target: 'pk_ID_Benutzer', destination: 'pk_ID'}]);*/
				/*var route = "privatkunde.ejs";
				if(user.model === "Geschaeftsbenutzer") route = "geschaeftskunde.ejs";
				models.queryFunctions(querieObject, function(results) {
					/*res.render(__dirname + '/' + route + '.ejs',
							{
								helper : require('../../views/helpers/helper'),
								layoutPath : '../../views/',
								isLoggedIn : req.isAuthenticated(),
								userdata: user,
								maps_key: cred.credentials.google_map_api,
								ratings: results.bewertungenbenutzer,
								bikes: results.bikes,
								userid: sanitizer.sanitize(user),
								bookings: results.bestellungen,
								own_bookings: rows7
							});*/
							//res.json({success: true});
				//});

			}
		);
		/*var user = req.session.passport.user;
		var bookings = [];
		var route = "selfprivatkunde";
		var query = "SELECT `picture`,`Vorname`, `Name`, `phone`, `email`, `city`, `street`, `lat`, `lon`, `housenumber`, `zip`, avg(rating) AS Rating FROM Benutzer AS b JOIN Privatbenutzer AS p ON b.pk_id = p.pk_id JOIN BewertungBenutzer AS bb ON b.pk_id = bb.pk_id WHERE b.pk_id = " + sanitizer.sanitize(user) + " GROUP BY Vorname";
		//console.log(req.session);
		mysqlpool.getConnection(function(err, connection) {
			if (err) {
				console.log("get connection db failed 0")
				return;
			}
		//	console.log("USER " + user); //#TODO CHECK USER
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
					ratings
					connection.query("SELECT * FROM `BewertungBenutzer`  LEFT JOIN `Benutzer` ON `Benutzer`.`pk_ID` = `BewertungBenutzer`.`pk_ID` WHERE `Benutzer`.`pk_ID` = '" + sanitizer.sanitize(user) +"'", function(err, rows4) {
						if (err) {
							console.log("get user db failed 3");
							res.redirect('/');//TODO ADD FLASH MESSAGE
							return;
						}
						bikes
						connection.query("SELECT * FROM `Fahrrad` WHERE `pk_ID_Benutzer` = '" + sanitizer.sanitize(user) +"'", function(err, rows5) {
							if (err) {
								console.log("get user db failed 4");
								res.redirect('/');//TODO ADD FLASH MESSAGE
								return;
							}
						//	console.log(rows5);
						//	console.log("-------------------------------")

							bookings
							connection.query("SELECT *, `Benutzer`.`pk_ID` AS `userid` FROM `Bestellung` LEFT JOIN `Benutzer` ON `Benutzer`.`pk_ID` = `Bestellung`.`pk_ID_Benutzer` WHERE 1", function(err, rows6) {
								if (err) {
									console.log("get user db failed 4");
									res.redirect('/');//TODO ADD FLASH MESSAGE
									return;
								}
							//	console.log(rows6);
							//	console.log("-------------------------------")
							
								own_bookings
								connection.query("SELECT *, `Benutzer`.`pk_ID` AS `userid` FROM `Bestellung`  LEFT JOIN `Fahrrad` ON `Fahrrad`.`pk_ID` = `Bestellung`.`pk_ID_Fahrrad` LEFT JOIN `Benutzer` ON `Benutzer`.`pk_ID` = `Fahrrad`.`pk_ID_Benutzer` WHERE `Bestellung`.`pk_ID_Benutzer`='" + sanitizer.sanitize(user) +"'", function(err, rows7) {
									if (err) {
										console.log("get user db failed 4");
										res.redirect('/');//TODO ADD FLASH MESSAGE
										return;
									


									
								//	console.log(rows7);
								//	console.log("-------------------------------")



							console.log("USERDATA", userdata);
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
								bookings: rows6,
								own_bookings: rows7
							});
						});
				
							
							
					});

						});
					
					});
				});
			});
			connection.release();
		});*/
		
	});

}