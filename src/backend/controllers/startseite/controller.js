var mysqlpool = require('../../config/database.js');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../../config/database');
var sanitizer = require('sanitizer');
var MobileDetect = require('mobile-detect');

module.exports = function(app, passport, verificationMail) {
	app.get('/', function(req, res) {

		md = new MobileDetect(req.headers['user-agent']);
		var pop = true;
		if(md.mobile() == null){pop = false;}
		console.log( md.mobile() == null); 


		var bikes =[];
		console.log("session: " + JSON.stringify(req.session));
		mysqlpool.getConnection(function(err, connection) {
			if (err) {
				console.log("get bike db failed")
				return;
			}
			connection.query("SELECT `Name`,`Lat`,`Lon`,`Fahrrad`.`pk_ID` as `totid`, `Price` as Preis, (AVG(`Rating`)) + 0.5 as Rating, `Picture` as Bild FROM Fahrrad LEFT JOIN `BewertungFahrrad` ON `BewertungFahrrad`.`pk_ID` = `Fahrrad`.`pk_ID` LEFT JOIN `Bild` ON `Bild`.`ID_Fahrrad` = `Fahrrad`.`pk_ID` GROUP BY `Fahrrad`.`pk_ID` ORDER BY `Rating` DESC LIMIT 25", function(err, rows) {
				if (err) {
					console.log("sget bike db failed")
					return;
				}
				bikes = rows;
				res.render(__dirname + '/startseite.ejs',
						{
							bezeichnung : 'trekkingbike',
							title : 'singlebike',
							helper : require('../../views/helpers/helper'),
							layoutPath : '../../views/',
							isLoggedIn : req.isAuthenticated(),
							bikes: bikes,
							mobile_popup: pop,
							loggedIn : true
						});
			});
			connection.release();
		});
	});

	app.post('/', function(req, res) {
		var bikes =[];

		md = new MobileDetect(req.headers['user-agent']);
		var pop = true;
		if(md.mobile() == null){pop = false;}


		mysqlpool.getConnection(function(err, connection) {
			if (err) {
				console.log("get bike db failed")
				return;
			}
			var query = "SELECT `Name`,`Lat`,`Lon`,`Fahrrad`.`pk_ID` as `totid`, `Price` as Preis, (AVG(`Rating`)) + 0.5 as Rating, `Picture` as Bild FROM Fahrrad LEFT JOIN `BewertungFahrrad` ON `BewertungFahrrad`.`pk_ID` = `Fahrrad`.`pk_ID` LEFT JOIN `Bild` ON `Bild`.`ID_Fahrrad` = `Fahrrad`.`pk_ID`";
			console.log(req.body);
			if((req.body.type != null && req.body.type != "Typ") || (req.body.preis != null && req.body.preis != "Preis") || (req.body.size != null && req.body.size != "Größe") || (req.body.plz != null && req.body.plz != "")){
				query += " WHERE ";
			}
			var first = true;
			if(req.body.type != null && req.body.type != "Typ"){
				if(!first){
					query += " AND";
				}
				first = false;
				query += " biketype = '" + sanitizer.sanitize(req.body.type) + "'";
			}
			if(req.body.preis != null && req.body.preis != "Preis"){
				if(!first){
					query += " AND";
				}

				first = false;
				query += " price <= " + sanitizer.sanitize(req.body.preis);
			}
			if(req.body.size != null && req.body.size != "Größe"){
				if(!first){
					query += " AND";
				}
				first = false;
				query += " size = '" + sanitizer.sanitize(req.body.size) + "'";
			}
			if(req.body.plz != null && req.body.plz != ""){
				if(!first){
					query += " AND";
				}
				first = false;
				query += " zip = '" + sanitizer.sanitize(req.body.plz) + "'";
			}
			query += " GROUP BY `Fahrrad`.`pk_ID` ORDER BY `Rating` DESC LIMIT 25";
			//console.log(query);
			connection.query(query, function(err, rows) {
				if (err) {
					console.log("get bike db failed")
					return;
				}
				bikes = rows;
				//TODO API KEY
				res.render(__dirname + '/startseite.ejs',
						{
							bezeichnung : 'trekkingbike',
							title : 'singlebike',
							helper : require('../../views/helpers/helper'),
							layoutPath : '../../views/',
							isLoggedIn : req.isAuthenticated(),
							bikes: bikes,
							mobile_popup: pop,
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
