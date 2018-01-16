var express  = require('express');
var engine = require('./node_modules/ejs-locals');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app      = express();
var config  = require('./config/credentials.js');
var port     = process.env.PORT || config.config.port;
var VerificationMail = require('./config/verificationMail');
var verificationMail = new VerificationMail();
var passport = require('passport');
var flash    = require('connect-flash');
var path = require('path');
var cron = require('node-cron');
var db = require('./config/database');
var mkdirp = require('mkdirp');
var models = require('./config/models');
var formdata = require('./config/formdata');
var fileUpload = require('express-fileupload');



var bsip = require('./config/base_ip.js')
console.log(bsip);
// connect to our database
require('./config/passport')(passport, verificationMail); // pass passport for
															// configuration

Object.keys(formdata.models).forEach(function(key, index) {
  console.log('server - models key: ', key);
  models.addModel(key);
});

mkdirp(config.config.image_upload_tmp_path, function(err) {
if(err){
console.log("path already exists");
}
});
mkdirp(config.config.image_conversion_path, function(err) {
	if(err){
console.log("path already exists");
}
});







// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true, parameterLimit: 5000000, limit: "1000mb"
}));
app.use(bodyParser.json({limit: "1000mb"}));


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
app.use(flash({})); // use connect-flash for flash messages stored in session

app.use(express.static(path.join(__dirname, 'public')));



var task = cron.schedule('59 59 23 * * *', function(){
    console.log('run deletion cronjon');
  db.getConnection(function(err,connection){
    if (err) {
      console.log("-- DELETION CRONJOB FAILED -- SQL POOL")
      return;
    }
  connection.query("DELETE FROM `Benutzer` WHERE `verified`='0' AND `creation_date`=DATE_SUB(NOW(), INTERVAL 1 DAY)",function(err,rows){
    if(err) {
        console.log("-- DELETION CRONJOB FAILED --")
    }
      connection.release();
      console.log('-- CRON OK --');
      });
  });
});



require('./controllers/')(app, passport, verificationMail);
app.listen(port);
console.log('The magic happens on port ' + port);
