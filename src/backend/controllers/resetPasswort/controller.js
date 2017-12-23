module.exports = function(app, passport, verificationMail) {
	app.get('/reset', function(req, res) {
		res.render(__dirname +'/resetPasswort.ejs', { 
			helper: require('../../views/helpers/helper'),
			layoutPath: '../../views/',
			isLoggedIn : req.isAuthenticated(),
		});
	});
}