// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var mysqlpool     =    require('./database.js');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var sanitizer = require('sanitizer');

//var VerificationMail = require('./verificationMail');
//var verificationMail = new VerificationMail();

// expose this function to our app using module.exports
module.exports = function(passport, verificationMail) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.pk_id_user);
    });



    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        //mysqlpool
        mysqlpool.pool.getConnection(function(err,connection){
            if (err) {
              console.log("passport.deserializeUser db failed")
              return;
            }
        connection.query("SELECT * FROM `Benutzer` WHERE `pk_ID`='"+sanitizer.sanitize(id)+"'", function(err, rows){
            done(err, rows[0]);
        });
        connection.release();
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'passwort',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, passwort, done) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            mysqlpool.pool.getConnection(function(err,connection){
                if (err) {
                  console.log("passport.deserializeUser db failed")
                  return;
                }

            connection.query("SELECT * FROM `Benutzer` WHERE `email`='"+sanitizer.sanitize(email)+"'", function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    // if there is no user with that username
                    // create the user
                    var newUserMysql = {
                        email: email,
                        passwort: bcrypt.hashSync(passwort, null, null)  // use the generateHash function in our user model
                    };

                    var insertQuery = "INSERT INTO tbl_benutzer ( `email`, `passwort` ) values (?,?)";

                    connection.query(insertQuery, [sanitizer.sanitize(newUserMysql.email), sanitizer.sanitize(newUserMysql.passwort)], function(err, rows) {
                        console.log("[mysql error]",err);
                        newUserMysql.pk_id_user = rows.insertId;

                        req.flash('loginMessage', 'We sent an email to ' + newUserMysql.email + '. Follow the instructions to activate your Account!');
                        verificationMail.sendMail(newUserMysql);
                        return done(null, newUserMysql);
                    });
                }
            });
            connection.release();
        })
    })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'passwort',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, passwort, done) { // callback with email and password from our form
            mysqlpool.pool.getConnection(function(err,connection){
                if (err) {
                  console.log("passport.deserializeUser db failed")
                  return;
                }
            connection.query("SELECT * FROM `Benutzer` WHERE `email`='"+sanitizer.sanitize(email)+"'", function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(passwort, rows[0].pw))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                if(rows[0].verified == 0)
                    return done(null, false, req.flash('loginMessage', "Your account hasn't been activated yet. Resend Activatin Email?"));
                // all is well, return successful user
                return done(null, rows[0]);
            });
            connection.release()
        });
        })
    );
};
