var express  = require('express');
var engine = require('./node_modules/ejs-locals');
var session  = require('express-session');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var multer  =   require('multer');
var app      = express();

app.use(bodyParser.json());

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true, parameterLimit: 50, limit: "1000mb"
}));
app.use(bodyParser.json({limit: "1000mb"}));




app.get('/uploader',function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
  upload(req,res,function(err) {
    console.log(req.body);
    console.log(req.files);
    var photos = [];
    for(var i = 0; i < req.body.imagecounter; i++) {
      var photo = req.files[i].filename;
      photos.push(photo);
    }
    if(err) {
      return res.end("Error uploading file.");
    }
    res.json({output: photos});
  });
});




var upload = multer({ storage : storage }).array('userPhoto',5);




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
var bsip = require('./config/base_ip.js');
var multer	=	require('multer');
var app_fileserver=	express();
const proxy = require('http-proxy-middleware');
const app_proxy = express();


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
	extended: true, parameterLimit: 50, limit: "1000mb"
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
connection.query("UPDATE `Benutzer` SET verification_hash`=NULL,`housenumber`='-1',`country`='default',`city`='default',`zip`='00000',`phone`='+',`street`='default',`picture`=NULL,`lat`=NULL,`lon`=NULL,`deleted`='1' WHERE `verified`='0' AND `creation_date`=DATE_SUB(NOW(), INTERVAL 1 DAY)",function(err,rows){
  if(err) {
      console.log("-- DELETION CRONJOB FAILED --")
  }
    connection.release();
    console.log('-- CRON OK --');
    });
});
});




require('./controllers/')(app, passport, verificationMail);





/*app_fileserver.use(bodyParser.json());
app_fileserver.use(express.static('uploads'));

var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});


app_fileserver.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app_fileserver.post('/photo',function(req,res){
	var upload = multer({ storage : storage }).array('userPhoto', req.body.imagecounter);
	upload(req,res,function(err) {
		console.log(req.body);
		console.log(req.files);
		var photos = [];
		for(var i = 0; i < req.body.imagecounter; i++) {
      if(req.body[i].filename == null || req.body[i].filename == undefined){err = true;break;}
			var photo = req.files[i].filename;
			photos.push(photo);
		}
		if(err) {
			return res.end("Error uploading file.");
		}
		res.json({output: photos});
	});
});*/


app.get('*', function(req, res){
  res.send('what???', 404);
});





app_proxy.use('/_api', proxy({
  target: 'http://marcelochsendorf.com:3003', 
  changeOrigin: true,
  pathRewrite: {
      '^/_api' : '/'
  }
}));


app_proxy.use('/', proxy({
  target: 'http://localhost:3002', 
  changeOrigin: true,
  pathRewrite: {
      '^/app' : '/'
  }
}));











/*-----------------------------------------------------------*/







/*app_fileserver.listen(3001,function(){
    console.log("Working on port 3001");*/
    app_proxy.listen(3000, () => {
      console.log('Listening on: http://localhost:3000');
      app.listen(port);
		console.log('The magic happens on port ' + port);
    });



