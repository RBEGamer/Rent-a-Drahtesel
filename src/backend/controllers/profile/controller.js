var mysqlpool = require('../../config/database.js');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../../config/database');
var sanitizer = require('sanitizer');
var cred = require('../../config/credentials.js');
var models = require('../../config/models');
var wait = require('wait.for');
var waitUntil = require('wait-until');

module.exports = function(app, passport, verificationMail) {
	app.get('/profile/:id', function(req, res) {
		var privat = true;
		var user = req.params.id;
		var route = "privatkunde";
		var query = "SELECT b.pk_ID, `picture`,`Vorname`, `Name`, `phone`, `email`, `city`, `street`, `lat`, `lon`, `housenumber`, `zip`, avg(rating) AS Rating FROM Benutzer AS b JOIN Privatbenutzer AS p ON b.pk_id = p.pk_id LEFT JOIN BewertungBenutzer AS bb ON b.pk_id = bb.pk_id WHERE b.pk_id = " + sanitizer.sanitize(user) + " GROUP BY Vorname";
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
					query = "SELECT b.pk_ID, `picture`,`Banner`, `WebUrl`, `FacebookUrl`, `TwitterUrl`, `InstagramUrl`,`Firmenname`,`phone`, `email`, `city`, `street`, `lat`, `lon`, `housenumber`, `zip`, avg(rating) AS Rating FROM `Benutzer` AS b JOIN `Geschaeftsbenutzer` AS p ON b.pk_id = p.pk_id LEFT JOIN `BewertungBenutzer` AS bb ON b.pk_id = bb.pk_id WHERE b.pk_id = " + sanitizer.sanitize(user) + " GROUP BY `Firmenname`";
				}
				connection.query(query, function(err, rows) {
					if (err) {
						console.log("get user db failed")
						res.redirect('/');//TODO ADD FLASH MESSAGE
						return;
					}
					//console.log(rows);
					var userdata = rows[0];
					//	console.log(sanitizer.sanitize(user))
					connection.query("SELECT * FROM `BewertungBenutzer` LEFT JOIN `Benutzer` ON `Benutzer`.`pk_ID` = `BewertungBenutzer`.`pk_ID` WHERE `Benutzer`.`pk_ID` = '" + sanitizer.sanitize(user) +"'", function(err, rows4) {
						if (err) {
							console.log("get user db failed 3");
							res.redirect('/');//TODO ADD FLASH MESSAGE
							return;
						}

						var ready = false;
						var i = 0;
						if(rows4.length === 0){
							ready = true;
						}
						rows4.forEach(function(n){
							var q = "SELECT CONCAT(Vorname, ' ', name) as Name from Privatbenutzer where pk_id = " + sanitizer.sanitize(n.Rater);
							console.log(q);
							connection.query("Select count(*) as anz FROM Privatbenutzer WHERE pk_ID = " + sanitizer.sanitize(n.Rater), function(err, rows) {
								if (err) {
									console.log("get userrole db rater failed: " + n.Rater);
									return;
								}
								console.log("test");
								if(rows[0].anz == 0){
									q = "SELECT Firmenname as Name from Geschaeftsbenutzer where pk_id = " + n.Rater;
								}
								console.log("h");
								connection.query(q, function(err, rater) {
									if (err) {
										console.log("get user db failed");
										return;
									}
									console.log(rater[0].Name);
									n.ratername = rater[0].Name;

									i++;
									if(i === rows4.length){
										ready = true;
									}
								});
							});
						});
						
						console.log("hier");
						waitUntil()
					    .interval(500)
					    .times(100)
					    .condition(function() {
					        return ready;
					    })
					    .done(function(result) {
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
						console.log("da");
						//console.log("PROFILE", userdata);
							
						});
				});
			});
			connection.release();
		});
	});

	app.get('/profile', function(req, res) {
		var id = req.session.passport.user;
		//JOIN BewertungBenutzer  ON Benutzer.pk_id = BewertungBenutzer.pk_id
		if(id == undefined){return res.redirect('/');}
		models.findSpecialisation(
			['Geschaeftsbenutzer', 'Privatbenutzer'], 
			'Benutzer',
			['*'],
			{pk_ID: id},
			function(user) {



				var bewertungenbenutzer =  function(callback) { models.findComplete('BewertungBenutzer', ["*"], {pk_ID: user.data.pk_ID}, [{model: 'Benutzer', target: 'Rater', destination: 'pk_ID'}],callback);};
				var bikes  = function(callback) { models.findComplete('Fahrrad', ["*"], {pk_ID_Benutzer: user.data.pk_ID}, [], callback);};
				var bestellungen = function(callback) { models.findComplete('Bestellung', ["*"], {}, {}, callback);};
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
					var i = 0;
					var bestellungen = [];
					results.own_bestellungen.forEach(function(bestellung){
						mysqlpool.getConnection(function(err, connection) {
							console.log(bestellung);
							var query = "Select pk_ID_Benutzer from Fahrrad where pk_ID = " + bestellung.pk_ID_Fahrrad;
							connection.query(query, function(err, userid) {
								if(err){
									console.log("query failed 1");
								}
								var query = "Select count(*) as anz from Privatbenutzer where pk_ID = " + userid[0].pk_ID_Benutzer;
								connection.query(query, function(err, anz) {
									if(err){
										console.log("query failed 2: " + query);
									}
									if(anz[0].anz == 0){
										query = "Select Firmenname as name from Geschäftsbenutzer where pk_ID = " + userid[0].pk_ID_Benutzer;
									}else{
										query = "Select CONCAT(Vorname, ' ', Name) as name from Privatbenutzer where pk_ID = " + userid[0].pk_ID_Benutzer;
									}
									connection.query(query, function(err, name) {
										if(err){
											console.log("query failed 3: " + query)
										}
										bestellung.besitzername = name[0].name;
										bestellung.besitzerid = userid[0].pk_ID_Benutzer;
										i++;
										console.log(bestellung.besitzername);
										console.log(bestellung);
										console.log("i: " + i);
										bestellungen.push(bestellung);
										console.log(bestellungen);
									});
								});
							});
						});
					});

						
						
						/*
						models.findSpecialisation['Geschaeftsbenutzer', 'Privatbenutzer'], 
						'Benutzer',
						['*'],
						{pk_ID: bestellung.pk_ID_Benutzer},
						function(rater) {
							console.log("Rater: " + rater);
							if(rater.model === "Geschaeftsbenutzer"){
								var raterdata = function(callback){ models.findComplete('Geschaeftsbenutzer', ["*"], {pk_ID: bestellung.rater}, [], callback);};
								var quo = {
										raterdata: raterdata
									}
								models.queryFunctions(quo, function(res) {
									bestellung.ratername = res.raterdata.Firmenname;
								});
							}else{
								var raterdata = function(callback){ models.findComplete('Privatbenutzer', ["*"], {pk_ID: bestellung.rater}, [], callback);};
								var quo = {
										raterdata: raterdata
									}
								models.queryFunctions(quo, function(res) {
									bestellung.ratername = res.raterdata.Vorname + ' ' + res.raterdata.Name;
								});
							}
						}
						*/
						
					
					waitUntil()
				    .interval(400)
				    .times(10)
				    .condition(function() {
				        return i >= results.own_bestellungen.length;
				    })
				    .done(function(result) {
				        
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
							own_bookings: bestellungen,
							own_rating: results.own_rating[0],
							userid: sanitizer.sanitize(id)
						}
					);
				    	
				    });
					
					
							
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
	
	app.post('/profile/rate', function(req, res) {
		mysqlpool.getConnection(function(err, connection) {
	    	if (err) {
				console.log("connection failed");
				return;
			}else{
				var query = "INSERT INTO BewertungBenutzer (pk_ID, Rater, Rating, Description) VALUES ("
						+ sanitizer.sanitize(req.body.pk_id) + ", " + sanitizer.sanitize(req.session.passport.user) + ", " 
						+ sanitizer.sanitize(req.body.bewertungsnr * 2) + ", '" + sanitizer.sanitize(req.body.bewertungstext) + "')";
				connection.query(query, function(err, rows1) {
					if (err) {
						console.log("query failed: " + query);
						return;
					}else{
						console.log("done!");
						res.redirect('/profile/' + req.body.pk_id);
					}
				}); 
			}
	    });
	});

	app.post('/deleteBike', function(req, res, next) {
		mysqlpool.getConnection(function(err, connection) {
			if (err) {
				console.log(err);
				return;
			}
			var query = "delete from Fahrrad where pk_id = " + sanitizer.sanitize(req.body.id);
			connection.query(query, function(err, rows) {
				if (err) {
					console.log("delete failed: " + query)
					return;
				}
			});
			connection.release();
			res.redirect('/profile');
		});
	});
}