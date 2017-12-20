module.exports = function(app, passport, verificationMail) {
	app.get('/', function(req, res) {

		console.log("kommt an!");
		res.render(__dirname +'/startseite.ejs', { 
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

	app.get('/startseite/style.css', function(req, res, next) {
		res.sendfile(__dirname +'/_style.css');
	});
	app.get('/startseite/scripts.js', function(req, res, next) {
		res.sendfile(__dirname+'/_script.js');
	});
}