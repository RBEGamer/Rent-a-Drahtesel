var mysqlpool = require('../../config/database.js');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../../config/database');
var sanitizer = require('sanitizer');

module.exports = function(app, passport, verificationMail) {
	app.get('/', function(req, res) {
		var bikes =[];
		mysqlpool.getConnection(function(err, connection) {
			if (err) {
				console.log("get bike db failed")
				return;
			}
			connection.query("SELECT `Name`, `Price` as Preis, AVG(`Rating`) * 2 + 0.25 as Rating, `Picture` as Bild FROM Fahrrad LEFT JOIN `BewertungFahrrad` ON `BewertungFahrrad`.`pk_ID` = `Fahrrad`.`pk_ID` LEFT JOIN `Bild` ON `Bild`.`ID_Fahrrad` = `Fahrrad`.`pk_ID` GROUP BY `Fahrrad`.`pk_ID` ORDER BY `Rating` DESC LIMIT 25", function(err, rows) {
				if (err) {
					console.log("get bike db failed")
					return;
				}
				bikes = rows;
				console.log(rows[0].Rating)
				res.render(__dirname + '/startseite.ejs',
						{
							bezeichnung : 'trekkingbike',
							title : 'singlebike',
							helper : require('../../views/helpers/helper'),
							layoutPath : '../../views/',
							isLoggedIn : req.isAuthenticated(),
							bikes: bikes,
							loggedIn : true
						});
			});
			connection.release();
		});

		
	});
	app.get('/startseite/style.css', function(req, res, next) {
		res.sendfile(__dirname + '/_style.css');
	});
	app.get('/startseite/scripts.js', function(req, res, next) {
		res.sendfile(__dirname + '/_script.js');
	});
}
