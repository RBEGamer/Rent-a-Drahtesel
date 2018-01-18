var ip = require("ip");
var config  = require('./credentials.js');
var port     = process.env.PORT || config.config.port_activation_email;

var base_url = "http://";
base_url += String(ip.address());
if(port != 80){
	base_url += ":"+String(port);
}
base_url += "/"
module.exports = base_url;
