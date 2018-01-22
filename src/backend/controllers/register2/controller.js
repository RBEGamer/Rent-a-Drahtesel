module.exports = function(app, passport, verificationMail) {
	app.get('/register2', function(req, res) {
		res.render(__dirname + '/' + req.params.file, {
			title: 'Login',
			loggedIn: req.isAuthenticated(),
			layoutPath: '../../views/layout'
		});
    });
    
    app.get('/register2/geschaeftskunde', function(req, res) {
        res.render(__dirname + '/geschaeftskunde.ejs')
    });

    app.get('/register2/privatkunde', function(req, res) {
        res.render(__dirname + '/privatkunde.ejs')
    });

    app.post('/register2/geschaeftskunde', function(req, res) {
        
    });

    app.post('/register2/privatkunde', function(req, res) {

    });
}