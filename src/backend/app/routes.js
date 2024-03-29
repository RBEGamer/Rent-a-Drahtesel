version = require('../config/version')

module.exports = function(app, passport, verificationMail) {


	app.get('/version', function(req, res) {
		res.send("<h1>VERSION:" + version.backend_version + "</h1>");
	});



	app.get('/', function(req, res) {

		res.render('index.ejs', {
			loggedIn: req.isAuthenticated(),
			message: req.flash('signupMessage')
		}); // load the index.ejs file
	});


	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', 
		passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    	});


	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	app.get('/signup/verification/:id/:hash', verificationMail.verificate,
		function(req, res) {
			res.render('login.ejs', {
				message: req.flash('loginMessage')
			}); 
	});

	

	// process the signup form
	/*app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/login', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));*/

	app.post('/signup', function(req, res, next) {
		passport.authenticate('local-signup', function(err, user, info){
			if(err) {return next(err); }
			if(!user) {return res.redirect('/signup');}
			req.logIn(user, function(err) {
				if(err) {return next(err); }
				req.logout();
				
				return res.redirect('/login');
			});
		})(req, res, next);
	});


	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	app.get('/bikes', function(req, res) {
		res.render('bikes.ejs', {
			loggedIn: req.isAuthenticated()
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	/*app.get('/editprofile', isLoggedIn, function(req, res) {
		res.render('editprofile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});*/

};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
