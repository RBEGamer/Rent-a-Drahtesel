var base64 = require('./img_convert');

module.exports = function(type, value) {
	console.log(type, value);
	if(type.indexOf('int') !== -1)
		return value;
	else
		return "'" + value + "'";

}