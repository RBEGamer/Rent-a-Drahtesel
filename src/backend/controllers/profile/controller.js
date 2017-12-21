module.exports = function(app, passport, verificationMail) {
	app.get('/profile/pa', function(req, res) {

		res.render(__dirname +'/privatkunde.ejs', { 
			helper: require('../../views/helpers/helper'),
			layoutPath: '../../views/'
		});
	});

	app.get('/profile/ga', function(req, res) {
		res.render(__dirname+'/geschaeftskunde.ejs', {
			layoutPath: '../../views/'
		});
	});

	app.get('/profile/pe', function(req, res) {
		res.render(__dirname +'/selfprivatkunde.ejs', {
			layoutPath: '../../views/'
		});
	});

	app.get('/profile/ge', function(req, res) {
		res.render(__dirname+'/selfgeschaeftskunde.ejs', {
			layoutPath: '../../views/'
		});
	});

	app.get('/profile/script.js', function(req, res, next) {
		res.sendfile(__dirname+'/_script.js');
	});


}