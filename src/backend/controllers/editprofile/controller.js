var mysqlpool = require('../../config/database.js');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../../config/database');
var sanitizer = require('sanitizer');
var cred = require('../../config/credentials.js');

module.exports = function(app, passport, verificationMail) {


    app.get('/editprofile', function(req, res) {

		if(!req.isAuthenticated()) {
            res.redirect('/profile');
            return;
        }
        
        var user = req.session.passport.user;
        console.log("USER:" + user);
        if(user == undefined){
            res.redirect('/profile');
            return;
        }
        var editmode = 0; //0 = invalid // 1= privat // 2 = geschäft

        mysqlpool.getConnection(function(err, connection) {
			if (err) {
                res.redirect('/profile');
				console.log("get connection db failed 0")
				return;
            }
            
            var query = "SELECT `picture`,`Vorname`, `Name`, `phone`, `email`, `city`, `street`, `lat`, `lon`, `housenumber`,`country`, `zip`, avg(rating) AS Rating FROM Benutzer AS b JOIN Privatbenutzer AS p ON b.pk_id = p.pk_id JOIN BewertungBenutzer AS bb ON b.pk_id = bb.pk_id WHERE b.pk_id = " + sanitizer.sanitize(user) + " GROUP BY Vorname"
		console.log("Params: " + JSON.stringify(req.params))
		console.log("User: " + user);
		mysqlpool.getConnection(function(err, connection) {
			if (err) {
				console.log("get connection db failed 1")
				res.redirect('/profile');//TODO ADD FLASH MESSAGE
				return;
            }
            
			connection.query("Select count(*) as anz FROM Privatbenutzer WHERE pk_ID = " + sanitizer.sanitize(user), function(err, rows) {
				if (err) {
					console.log("get userrole db failed 2")
					res.redirect('/profile');//TODO ADD FLASH MESSAGE
					return;
                }
                editmode = 1;
				if(rows[0].anz == 0){
					route = "geschaeftskunde";
					query = "SELECT `picture`,`Banner`, `WebUrl`, `FacebookUrl`, `TwitterUrl`, `InstagramUrl`,`Firmenname`,`phone`, `email`, `city`,`country`, `street`, `lat`, `lon`, `housenumber`, `zip`, avg(rating) AS Rating FROM `Benutzer` AS b JOIN `Geschaeftsbenutzer` AS p ON b.pk_id = p.pk_id JOIN `BewertungBenutzer` AS bb ON b.pk_id = bb.pk_id WHERE b.pk_id = " + sanitizer.sanitize(user) + " GROUP BY `Firmenname`";
                    editmode = 2;
                }
				connection.query(query, function(err, rows) {
					if (err) {
						console.log("get user db failed 3")
						res.redirect('/profile');//TODO ADD FLASH MESSAGE
						return;
                    }
                    



           

        /*var route = "";
        if(editmode == 1){route = "privat";}else if(editmode == 2){route = "gesch"}
        if(route != ""){
        res.render(__dirname +'/' + route + '_' + 'editprofile.ejs', { 
			helper: require('../../views/helpers/helper'),
			layoutPath: '../../views/',
			message: req.flash('loginMessage'),
            isLoggedIn: req.isAuthenticated(),
            data: rows[0]
        });
        }else{
            console.log("route = ''")
        res.redirect('/profile');
        }*/


    }); }); }); });
});
    


app.post('/editprofile', function(req, res) {
    if(!req.isAuthenticated()) {
        res.redirect('/profile');
        return;
    }

    var user = req.session.passport.user;
        console.log("USER:" + user);
        if(user == undefined){
            res.redirect('/profile');
            return;
        }


    if (req.body.action == "edit") {
        //TODO CHECK FIELDS
        //UPDATE INFO
        //wenn pw1 gesetzt passwort updaten && pw1==pw2
        //wenn picture oder banner gesetzt sind hochladen und so
        res.redirect('/profile');
        return;

    }else  if (req.body.action == "delete") {
        //DELETE USER
        //aus privat/geschäft dann aus fahrräder / bewertungen buchungen zuletzt aus benutzer
        res.redirect('/');
        return;
    }else{
        res.redirect('/editprofile');
        return;
     }   
});




}