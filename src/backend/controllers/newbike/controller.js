//import { request } from 'http';

var mysqlpool = require('../../config/database.js');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../../config/database');
var cred = require('../../config/credentials');
var sanitizer = require('sanitizer');
var MobileDetect = require('mobile-detect');
var gmh = require('../../config/google_maps_helper');

var NodeGeocoder = require('node-geocoder');
var options = {
	provider: 'google',
	httpAdapter: 'https',
	apiKey: cred.google_map_api,
	formatter: null
  };

var geocoder = NodeGeocoder(options);


async function get_maps_info(_map_combiner){
	geocoder.geocode(_map_combiner)
	  .then(function(res) {
		if(res == null  || res.length > 0){
		  return{
			"lat":-1,
			"lon":-1
		  }
		}
		console.log(res[0].latitude)
		console.log(res[0].longitude)
		return {
		  "lat": res[0].latitude,
		  "lon": res[0].longitude
		}
	  })
	  .catch(function(err) {
		console.log(err);
	  });
	}



module.exports = function(app, passport, verificationMail) {
	app.get('/bike/new', function(req, res) {
		res.render(__dirname +'/newbike.ejs', { 
			helper: require('../../views/helpers/helper'),
			layoutPath: '../../views/',
			isLoggedIn : req.isAuthenticated()
		});
	});
	//BILD COORD
	app.post('/bike/new', function(req, res) {
		mysqlpool.getConnection(function(err, connection) {
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
			//TODO!! lat und lon berechnen

			geocoder.geocode(req.body.country + " " + req.body.city + " " + req.body.street +" " + req.body.housenumber)
	  .then(function(res) {
		if(res == null  || res.length < 0){
			res.redirect("/profile");
		}
		console.log(res[0].latitude)
		console.log(res[0].longitude)
		

		query += res[0].latitude + ", ";
		query += res[0].longitude + ", ";
		query += req.session.passport.user + ", ";
		query += "'" + req.body.name + "'" + ")";
		console.log("childseat: " + req.body.childseat);
		console.log(query);
		connection.query(query, function(err, rows) {
			if (err) {
				console.log("insert bike db failed")
				return;
			}
		});
		connection.release();

	  })
	  .catch(function(err) {
		console.log(err);
	  });


		});
		res.redirect("/profile");
	});
}