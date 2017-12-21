
// get all the tools we need
var express  = require('express');
var engine = require('./node_modules/ejs-locals');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app      = express();
var port     = process.env.PORT || 8080;
var VerificationMail = require('./config/verificationMail');
var verificationMail = new VerificationMail();
var passport = require('passport');
var flash    = require('connect-flash');
var path = require('path');
var cron = require('node-cron');
var db = require('./config/database');
// connect to our database

require('./config/passport')(passport, verificationMail); // pass passport for configuration


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.engine('ejs', engine);
app.set('view engine', 'ejs'); // set up ejs for templating
app.set('views', __dirname + '/views');

// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(express.static(path.join(__dirname, 'public')));





var task = cron.schedule('* 59 23 * * *', function(){
    console.log('run deletion cronjon');
  db.pool.getConnection(function(err,connection){
    if (err) {
      console.log("-- DELETION CRONJOB FAILED -- SQL POOL")
      return;
    }
  connection.query("DELETE FROM `tbl_benutzer` WHERE `verified`='0' AND `creation_date`=DATE_SUB(NOW(), INTERVAL 1 DAY)",function(err,rows){
    if(err) {
        console.log("-- DELETION CRONJOB FAILED --")
    }
    connection.query("INSERT INTO `tbl_log` (`id`, `time`, `level`, `message`, `payload`) VALUES (NULL, CURRENT_TIMESTAMP, 'INFO', '-- LOG DELETED --', '');",function(err,rows){
        //connection.release();
    });
      connection.release();
      console.log('-- CRON OK --');
      });
  });
});








//require('./app/routes.js')(app, passport, verificationMail); // load our routes and pass in our app and fully configured passport
require('./controllers/')(app, passport, verificationMail);
app.listen(port);
console.log('The magic happens on port ' + port);


