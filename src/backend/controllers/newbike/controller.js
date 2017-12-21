module.exports = function(app, passport, verificationMail) {
	app.get('/bike/new', function(req, res) {

		res.render(__dirname +'/newbike.ejs', { 
			helper: require('../../views/helpers/helper'),
			layoutPath: '../../views/'
		});
	});
}