module.exports = function(input, args) {
	var a = input;
	for(var i = 0; i < args.length; i++) {
		a = a.replace("{" + i + "}", args[i]);
	}
	return a;
}