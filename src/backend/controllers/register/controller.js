module.exports = function(app, passport, verificationMail) {
	app.get('/register', function(req, res) {

		res.render(__dirname +'/register.ejs', { 
			bezeichnung: 'trekkingbike', 
			title: 'singlebike',
			helper: require('../../views/helpers/helper'),
			layoutPath: '../../views/',
			tab: {
				menus: ['a', 'b', 'c'],
				partials: ['content_a.ejs', 'content_b.ejs', 'content_c.ejs']
				//data...
			},
			loggedIn: true
		});
	});

	app.get('/register/style.css', function(req, res, next) {
		res.sendfile(__dirname +'/_style.css');
	});
	app.get('/register/scripts.js', function(req, res, next) {
		res.sendfile(__dirname+'/_script.js');
	});
}