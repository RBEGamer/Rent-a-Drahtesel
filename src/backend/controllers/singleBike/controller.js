module.exports = function(app, passport, verificationMail) {
	app.get('/bike', function(req, res) {
		res.render(__dirname +'/singlebike.ejs', { 
			bezeichnung: 'trekkingbike', 
			title: 'singlebike',
			helper: require('../../views/helpers/helper'),
			layoutPath: '../../views/',
			loggedIn: true
		});
	});
}