var mysqlpool = require('../../config/database.js');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../../config/database');
var cred = require('../../config/credentials');
var sanitizer = require('sanitizer');
var MobileDetect = require('mobile-detect');
var models = require('../../config/models');

module.exports = function(app, passport, verificationMail) {
	app.get('/bike/new', function(req, res) {

		var query = "SELECT COUNT(pk_ID_Benutzer) AS anz FROM Fahrrad WHERE pk_ID_Benutzer = " + req.session.passport.user;
		models.dbconnection(query, function(rows) {
			console.log(rows);
			res.render(__dirname +'/newbike.ejs', { 
				helper: require('../../views/helpers/helper'),
				layoutPath: '../../views/',
				isLoggedIn : req.isAuthenticated(),
				anz : rows
			});	
		});
	});

	
	app.post('/bike/new', function(req, res) {
		console.log(req.body);
		console.log(req.files);
		var id = req.session.passport.user;
		req.body.pk_ID_Benutzer = id;
		models.insertIntoModel('Fahrrad', req.body, function(result) {
			var ID_Fahrrad = result.lastID;
			var queryObject = {};
			console.log(req.body);
			console.log(req.body.image);

			var queryStrings = [];
			for(var i = 0; i < req.body.image.length; i++) {
				queryStrings.push("INSERT INTO Bild (ID_Fahrrad, Picture) VALUES (" + ID_Fahrrad + ", '" + req.body.image[i] + "')");
			}

			var queryFunctions = [];
			queryFunctions[0] = function(callback) { models.dbconnection(queryStrings[0], callback);};
			queryFunctions[1] = function(callback) { models.dbconnection(queryStrings[1], callback);};
			queryFunctions[2] = function(callback) { models.dbconnection(queryStrings[2], callback);};
			queryFunctions[3] = function(callback) { models.dbconnection(queryStrings[3], callback);};
			queryFunctions[4] = function(callback) { models.dbconnection(queryStrings[4], callback);};
			
			var queryObject = {};
			for(var i = 0; i < req.body.image.length && i < 5; i++) {
				queryObject[i] = queryFunctions[i];
			}
			models.queryFunctions(queryObject, function(results) {
				res.json({results: results});
			});
		});
		/*mysqlpool.getConnection(function(err, connection) {
			if (err) {
				console.log("get bike db failed a")
				console.log(err);
				return;
			}
			var query = "INSERT INTO Fahrrad (Biketype, Size, Price, Description, Porter, Childseat, Threeday, Sevenday,"
						+ " Country, City, Street, ZIP, Housenumber, Lat, Lon, pk_ID_Benutzer, Name) VALUES ("
			query += "'" + req.body.type + "'" + ", ";
			query += "'" + req.body.size + "'" + ", ";
			query += req.body.price + ", ";
			query += "'" + req.body.description + "'" + ", ";
			if(req.body.porter === 'on'){
				query += "1, ";
			}else{
				query += "0, ";
			}
			if(req.body.childseat === 'on'){
				query += "1, ";
			}else{
				query += "0, ";
			}
			if(req.body.threedays === ''){
				query += 0 + ", ";
			}
			else{

				query += req.body.threedays + ", ";
			}
			if(req.body.sevendays === ''){
				query += 0 + ", ";
			}
			else{

				query += req.body.sevendays + ", ";
			}
			query += "'" + req.body.country + "'" + ",";
			query += "'" + req.body.city + "'" + ", ";
			query += "'" + req.body.street + "'" + ", ";
			query += "'" + req.body.zip + "'" + ", ";
			query += "'" + req.body.housenumber + "'" + ", ";
			
			var lat = "'" + req.body.lat + "'";
			var lon = "'" + req.body.lon + "'";
			query += lat + ", ";
			query += lon + ", ";
			query += req.session.passport.user + ", ";
			query += "'" + req.body.name + "'" + ")";
			console.log("childseat: " + req.body.childseat);
			console.log(query);
			connection.query(query, function(err, rows) {
				if (err) {
					console.log("insert bike db failed")
					return;
				}
				console.log(rows);
				res.json({rows: rows})
			});
			connection.release();
		});*/
	}); 

	app.get('/newbike/script.js', function(req, res, next) {
		res.sendfile(__dirname+'/_script.js');
	});
}