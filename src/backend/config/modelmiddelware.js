var models = require('./models');
var forms =  require('./formdata');
var bcrypt = require('bcrypt-nodejs');


function itemExists(modelname, data) {
	return function(req, res, next) {
		console.log("itemExists", req.body);
		var columns = {};
		for(var i = 0; i < data.length; i++) {
			columns[data[i]] = req.body[data[i]];
		}
		console.log(columns);
		console.log(modelname);
		models.findOne(modelname, columns, function(response) {
			console.log("FIND ONE ");
			console.log("----------------------");
			console.log(response);
			console.log("----------------------");
			console.log("FIND ONE");
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
		console.log('isLoggedIn - kommt an!');
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
		console.log('hashValue - kommt an!');
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



module.exports =  {
	itemExists: itemExists,
	hashValue: hashValue,
	updateReqBody: updateReqBody,
	isLoggedIn: isLoggedIn

}