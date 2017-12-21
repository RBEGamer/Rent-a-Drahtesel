module.exports = function(app, passport, verificationMail) {
	app.get('/login', function(req, res) {

		if(req.isAuthenticated()) {
			res.redirect('/profile/pe');
		}
		res.render(__dirname +'/login.ejs', { 
			helper: require('../../views/helpers/helper'),
			layoutPath: '../../views/',
			message: req.flash('loginMessage'),
			isLoggedIn: false
		});
	});

	app.post('/login', 
		passport.authenticate('local-login', {
            successRedirect : '/profile/pe', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        	redirectes.redirect('/');
    	});

	app.get('/login/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
}