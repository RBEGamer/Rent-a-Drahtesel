module.exports = function(app, passport, verificationMail) {
	app.get('/debug/:file', function(req, res) {
		res.render(__dirname + '/' + req.params.file, {
			title: 'Login',
			loggedIn: req.isAuthenticated(),
			layoutPath: '../../views/layout'
		});
	});
}