/*var express	=	require("express");
var bodyParser =	require("body-parser");
var multer	=	require('multer');
var app	=	express();
app.use(bodyParser.json());
app.use(express.static('upload'));

var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});


app.get('/',function(req,res){
      res.json({data: "fileServer"});
});
var upload = multer({ storage : storage }).array('userPhoto',2);
app.post('/upload/photo',function(req,res){
	console.log(req.body);
	console.log(req.files);
	
	upload(req,res,function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}
		var allImages = {};
		console.log(req.files);
		for(var i = 0; i < req.files.length; i++) {
			var path = req.files[i].filename;
			path = path.replace(/\\/gi,'/');
			allImages[i] = path;
		}
		var output = JSON.stringify({output: allImages});
		console.log(output);
		res.json({output : allImages});
	});
});

app.listen(3001,function(){
    console.log("Working on port 3001");
});*/

var express	=	require("express");
var bodyParser =	require("body-parser");
var multer	=	require('multer');
var app	=	express();
app.use(bodyParser.json());
app.use(express.static('uploads'));

var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});


app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/photo',function(req,res){
	var upload = multer({ storage : storage }).array('userPhoto', req.body.imagecounter);
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

app.listen(3001,function(){
    console.log("Working on port 3001");
});

