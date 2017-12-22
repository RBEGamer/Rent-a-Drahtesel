
var nodemailer = require("nodemailer");
var cred  = require('./credentials.js');
var crypto = require('crypto');
var mysqlpool = require('./database');
var sanitizer = require('sanitizer');
var bsip = require('./base_ip.js')



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
        var id = user.pk_ID;
        var hash = this.getHash(4);
        console.log("--------------");
        console.log(id);
        console.log("--------------");
        var updateQuery = "UPDATE `Benutzer` SET `verification_hash` = ? WHERE `pk_ID` = ?";
        console.log(updateQuery);

         var transp = nodemailer.createTransport("smtps://rent.a.drahtesel%40gmail.com:"+encodeURIComponent('softwarea8') + "@smtp.gmail.com:465");
         mysqlpool.getConnection(function(err,connection){
             if (err) {
               console.log("passport.deserializeUser db failed")
               return;
             }
        connection.query(updateQuery, [sanitizer.sanitize(hash), sanitizer.sanitize(id)], function(err, rows) {
            transp.sendMail({
                to: user.email,
                subject: "Test",
                html: "Hallo Rent-A-Bike Benutzer, <br> Bitte klicke innerhalb von 24h <a href='"+bsip+"signup/verification/" + id + "/" + hash + "'>Activate</a> um deinen Rent-A-Bike Account zu aktivieren.<br> Bitte Antworte nicht auf diese E-Mail. <br> Viele Gruesse dein Rent-A-Bike Team."
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
