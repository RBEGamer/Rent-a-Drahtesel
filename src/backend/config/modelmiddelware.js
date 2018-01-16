var models = require('./models');
var forms =  require('./formdata');
var bcrypt = require('bcrypt-nodejs');
var NodeGeocoder = require('node-geocoder');
var gc = require('geocoder');
var cred = require('./credentials.js');





function itemExists(modelname, data) {
	return function(req, res, next) {
		var columns = {};
		for(var i = 0; i < data.length; i++) {
			columns[data[i]] = req.body[data[i]];
		}
		models.findOne(modelname, columns, function(response) {
			if(response != null)
				res.locals.findOne = {response: response, found: true};
			else
				res.locals.findOne = {response: null, found: false};
			next();
		});
	}
};

function isLoggedIn() {
	return function(req, res, next) {
		if(req.isAuthenticated()) {
			next();
		} else {
			req.flash('loginMessage', 'Melden Sie sich wieder an!');
			res.redirect('/login');
			return;
		}
	}
}

function hashValue(column) {
	return function(req, res, next) {
		var unhashed = req.body[column];
		req.body[column] = bcrypt.hashSync(unhashed, null, null);
		next();
	}
}

function updateReqBody(keys, values) {
	return function(req, res, next) {
		for(var i = 0; i < keys.length; i++) {
			req.body[keys[i]] = values[i];
		}
		next();
	}
}

function addLatLon() {
	return function(req, res, next) {
		var options = {
	  		provider: 'google',
	  		httpAdapter: 'https',
	  		apiKey: 'AIzaSyCkMWSqlk6gTahbTNfaPaTqBsiGWtT_PRg',
	  		formatter: null
		};
		var country = req.body.country;
		var city = req.body.city;
		var street = req.body.street;
		var housenumber = req.body.housenumber;
		var address = housenumber + " " + street + " " + city + " " + country;
		var geocoder = NodeGeocoder(options);
		console.log(address);
		gc.geocode( address, function(results, error) {

                
                	console.log(results);
                    var latitude = results.latitude;
                    var longitude = results.longitude;
                    req.body.lon = longitude;
                    req.body.lat = latitude;
                    next();
               
        });
	}
}



module.exports =  {
	itemExists: itemExists,
	hashValue: hashValue,
	updateReqBody: updateReqBody,
	isLoggedIn: isLoggedIn,
	addLatLon: addLatLon

}