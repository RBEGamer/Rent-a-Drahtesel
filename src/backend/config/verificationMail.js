
var nodemailer = require("nodemailer");
var emailConfig = require('./email');
var crypto = require('crypto');
var mysql = require('mysql');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);


module.exports = function() {

    this.verificate = function(req, res, next) {
        var id = parseInt(req.params.id);
        var hash = req.params.hash;
        console.log(req.params);
        var selectionQuery = "SELECT * FROM `tbl_benutzer` WHERE pk_id_user= ?";

        connection.query(selectionQuery, [id], function(err, rows) {
            console.log(err);
            var foundVerificationHash = rows[0].verification_hash;
            if(hash == foundVerificationHash) {
                req.flash('loginMessage', 'Your Account has been activated. You can login from now on.');
                var updateQuery = "UPDATE tbl_benutzer SET verified = 1 WHERE pk_id_user = ?";
                connection.query(updateQuery, [id]);

            }else {
                req.flash('loginMessage', 'Invalid activation Key. Resend activation mail?');   
            }

            return next();            
        });
    }
    

    this.getHash = function(len) {
        return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
    }

    this.sendMail = function(user) {
        var id = user.pk_id_user;
        var hash = this.getHash(4);
    
        var updateQuery = "UPDATE tbl_benutzer SET verification_hash = ? WHERE pk_id_user = ?";
        
         var transp = nodemailer.createTransport("smtps://rent.a.drahtesel%40gmail.com:"+encodeURIComponent('softwarea8') + "@smtp.gmail.com:465"); 
        
        connection.query(updateQuery, [hash, id], function(err, rows) {
            console.log(err);
            transp.sendMail({
                to: user.email,
                subject: "Test",
                html: "<a href='http://localhost:8080/signup/verification/" + id + "/" + hash + "'>Activate</a>"
            },
            function(err, response) {
                if(err) {
                    console.log(err);
                }

                console.log(response);
            });
        });
    
    }
}