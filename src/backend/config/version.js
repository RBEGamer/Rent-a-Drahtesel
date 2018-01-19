fs = require('fs')


backend_version = function(){
var version = "-1"
fs.readFile('./version.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
    version = err
  }
  version = data;
//  console.log(data);
});
}


module.exports.backend_version;