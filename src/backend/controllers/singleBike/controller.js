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
			connection.query("select biketype, size, price, description, porter, childseat, threeday, sevenday, country, city, street, zip, housenumber, lat, lon, name from Fahrrad where pk_id = " + req.params.id, function(err, rows) {
				if (err) {
					console.log("get singlebike db failed")
					return;
				}

				bikes = rows;
				var txt = rows[0].description.substring(0,300);
				connection.query("select picture from Bild where id_fahrrad = " + req.params.id, function(err, rows) {
					if (err) {
						console.log("get singlebike pictures db failed")
						return;
					}
					pictures = rows;
					console.log(pictures);
					res.render(__dirname +'/singlebike.ejs', { 
					bezeichnung: 'trekkingbike', 
					title: 'singlebike',
					helper: require('../../views/helpers/helper'),
					layoutPath: '../../views/',
					bike: bikes[0],
					pictures: pictures,
					isLoggedIn: req.isAuthenticated(),
					maps_key: cred.credentials.google_map_api,
					bike_desc: txt
				});
				});
				
			});
			connection.release();	
		});
	});
}