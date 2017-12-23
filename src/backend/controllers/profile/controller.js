var mysqlpool = require('../../config/database.js');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../../config/database');
var sanitizer = require('sanitizer');

module.exports = function(app, passport, verificationMail) {
	app.get('/profile/:id', function(req, res) {
		var privat = true;
		var user = req.params.id;
		var route = "privatkunde";
		var query = "SELECT Vorname, Name, phone, email, city, street, lat, lon, housenumber, zip, avg(rating) AS Rating FROM Benutzer AS b JOIN Privatbenutzer AS p ON b.pk_id = p.pk_id JOIN BewertungBenutzer AS bb ON b.pk_id = bb.pk_id WHERE b.pk_id = " + user + " GROUP BY Vorname"
		console.log("Params: " + JSON.stringify(req.params))
		console.log("User: " + user);
		mysqlpool.getConnection(function(err, connection) {
			if (err) {
				console.log("get connection db failed")
				return;
			}
			connection.query("Select count(*) as anz FROM Privatbenutzer WHERE pk_ID = " + user, function(err, rows) {
				if (err) {
					console.log("get userrole db failed")
					return;
				}
				if(rows[0].anz == 0){
					route = "geschaetskunde";
					query = "SELECT Vorname, Name, phone, email, city, street, lat, lon, housenumber, zip, avg(rating) AS Rating FROM Benutzer AS b JOIN Geschäftsbenutzer AS p ON b.pk_id = p.pk_id JOIN BewertungBenutzer AS bb ON b.pk_id = bb.pk_id WHERE b.pk_id = " + user + " GROUP BY Firma";
				}
				connection.query(query, function(err, rows) {
					if (err) {
						console.log("get user db failed")
						return;
					}
					console.log(rows);
					userdata = rows[0];
					res.render(__dirname + '/' + route + '.ejs',
							{
								helper : require('../../views/helpers/helper'),
								layoutPath : '../../views/',
								isLoggedIn : req.isAuthenticated(),
								userdata: userdata,
								loggedIn : true
							});
				});
			});
			connection.release();
		});
	});

	app.get('/profile', function(req, res) {
		var user = req.session.passport.user;
		var route = "selfprivatkunde";
		var query = "SELECT Vorname, Name, phone, email, city, street, lat, lon, housenumber, zip, avg(rating) AS Rating FROM Benutzer AS b JOIN Privatbenutzer AS p ON b.pk_id = p.pk_id JOIN BewertungBenutzer AS bb ON b.pk_id = bb.pk_id WHERE b.pk_id = " + user + " GROUP BY Vorname";
		console.log(req.session);
		mysqlpool.getConnection(function(err, connection) {
			if (err) {
				console.log("get connection db failed")
				return;
			}
			connection.query("Select count(*) as anz FROM Privatbenutzer WHERE pk_ID = " + user, function(err, rows) {
				if (err) {
					console.log("get userrole db failed")
					return;
				}
				if(rows[0].anz == 0){
					route = "selfgeschaetskunde";
					query = "SELECT Vorname, Name, phone, email, city, street, lat, lon, housenumber, zip, avg(rating) AS Rating FROM Benutzer AS b JOIN Geschäftsbenutzer AS p ON b.pk_id = p.pk_id JOIN BewertungBenutzer AS bb ON b.pk_id = bb.pk_id WHERE b.pk_id = " + user + " GROUP BY Firma";
				}
				connection.query(query, function(err, rows) {
					if (err) {
						console.log("get user db failed")
						return;
					}
					console.log(rows);
					userdata = rows[0];
					res.render(__dirname + '/' + route + '.ejs',
							{
								helper : require('../../views/helpers/helper'),
								layoutPath : '../../views/',
								isLoggedIn : req.isAuthenticated(),
								userdata: userdata,
								loggedIn : true
							});
				});
			});
			connection.release();
		});
		
	});


}