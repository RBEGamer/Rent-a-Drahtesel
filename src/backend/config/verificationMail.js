
var nodemailer = require("nodemailer");
var cred  = require('./credentials.js');
var crypto = require('crypto');
var mysqlpool = require('./database');
var sanitizer = require('sanitizer');



module.exports = function() {

    this.verificate = function(req, res, next) {
        var id = parseInt(req.params.id);
        var hash = req.params.hash;
        console.log(req.params);
        var selectionQuery = "SELECT * FROM `Benutzer` WHERE `pk_ID`='?'";

        mysqlpool.getConnection(function(err,connection){
            if (err) {
              console.log("passport.deserializeUser db failed")
              return;
            }

        connection.query(selectionQuery, [sanitizer.sanitize(id)], function(err, rows) {
            console.log(err);
            var foundVerificationHash = rows[0].verification_hash;
            if(hash == foundVerificationHash) {
                req.flash('loginMessage', 'Your Account has been activated. You can login from now on.');
                var updateQuery = "UPDATE `Benutzer` SET `verified`='1' WHERE `pk_ID`='?'";
                connection.query(updateQuery, [sanitizer.sanitize(id)]);
            }else {
                req.flash('loginMessage', 'Invalid activation Key. Resend activation mail?');
            }

            return next();
        });
        connection.release()
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

         var transp = nodemailer.createTransport(cred.credentials.smtp_server.protocol + "://" +cred.credentials.smtp_server.auth.user+":"+encodeURIComponent(cred.credentials.smtp_server.auth.pass) + "@" + cred.credentials.smtp_server.host +":" + cred.credentials.smtp_server.port);
         mysqlpool.getConnection(function(err,connection){
             if (err) {
               console.log("passport.deserializeUser db failed")
               return;
             }
        connection.query(updateQuery, [sanitizer.sanitize(hash), sanitizer.sanitize(id)], function(err, rows) {
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

          connection.release()
});
        //

    }
}
