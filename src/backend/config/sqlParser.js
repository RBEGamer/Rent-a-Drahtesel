var base64 = require('./img_convert');

module.exports = function(type, value) {
//	console.log(type, value);
	if((type.indexOf('tiny') !== -1 && value === 'on') || (type.indexOf('tiny') !== -1 && value === 'off')) {
		return (value=== 'on' ? 1 : 0);
	}
	else if(type.indexOf('int') !== -1)
		return value;
	else if(type.indexOf('char'))
		return "'" + value + "'";
	else if(type.indexOf('(') !== -1 && type.indexOf(')') !== -1)
		return value;
	else
		return "'" + value + "'";
}