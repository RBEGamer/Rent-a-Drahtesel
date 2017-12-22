module.exports = function(app, passport, verificationMail) {
	app.get('/profile', function(req, res) {

		var route = "privatkunde";
		//wenn privat dann privatkunde sonst geschaeftskunde
		
		res.render(__dirname +'/' + route + '.ejs', { 
			helper: require('../../views/helpers/helper'),
			layoutPath: '../../views/'
		});
	});

	app.get('/profile/self', function(req, res) {
		
		var route = "selfprivatkunde";
		//wenn privat dann selfprivatkunde sonst selfgeschaeftskunde
		
		res.render(__dirname +'/' + route + '.ejs', {
			layoutPath: '../../views/'
		});
	});

	app.get('/profile/script.js', function(req, res, next) {
		res.sendfile(__dirname+'/_script.js');
	});


}