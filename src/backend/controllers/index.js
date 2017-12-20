var fs          = require('fs');
var validFileTypes  = ['js'];
var root = __dirname;




module.exports = function(app, passport, verificationMail) {
	requireFiles(root, app, passport, verificationMail);
}


var requireFiles = function (directory, app, passport, verificationMail) {
  fs.readdirSync(directory).forEach(function (fileName) {

    if(fs.lstatSync(directory + '/' + fileName).isDirectory()) {
      requireFiles(directory + '/' + fileName, app, passport, verificationMail);
    } else {

      if(fileName === 'index.js' && directory === root) return;
      if(fileName.charAt(0) === '_') return;
      if(validFileTypes.indexOf(fileName.split('.').pop()) === -1) return;
      require(directory + '/' + fileName)(app, passport, verificationMail);
    }
  });
};