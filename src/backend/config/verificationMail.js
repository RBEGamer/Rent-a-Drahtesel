
var nodemailer = require("nodemailer");
var cred  = require('./credentials.js');
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
        var selectionQuery = "SELECT * FROM `Benutzer` WHERE `pk_ID`='?'";

        connection.query(selectionQuery, [id], function(err, rows) {
            console.log(err);
            var foundVerificationHash = rows[0].verification_hash;
            if(hash == foundVerificationHash) {
                req.flash('loginMessage', 'Your Account has been activated. You can login from now on.');
                var updateQuery = "UPDATE `Benutzer` SET `verified`='1' WHERE `pk_ID`='?'";
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

        var updateQuery = "UPDATE `Benutzer` SET `verification_hash` = '?' WHERE `pk_ID` = '?'";

         var transp = nodemailer.createTransport(cred.smtp_server.protocol + "://" +cred.smtp_server.auth.user+":"+encodeURIComponent(cred.smtp_server.auth.pass) + "@" + cred.smtp_server.host +":" + cred.smtp_server.port);

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
