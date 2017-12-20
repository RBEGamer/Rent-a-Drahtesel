module.exports = function(app, passport, verificationMail) {
	app.get('/register', function(req, res) {

		res.render(__dirname +'/register.ejs', { 
			bezeichnung: 'trekkingbike', 
			title: 'singlebike',
			helper: require('../../views/helpers/helper'),
			layoutPath: '../../views/',
			formdata: {
				'commercial': {
					'input' :  
						['EMail*', 'Firma*', 'Straße*', 'Staat*', 'Stadt*', 'PLZ*', 'Passwort*', 'Land*', 'Passwortwiederholung*', 'Website', 'Facebook', 'Instagram', 'Twitter'],
					'upload' :
						['Bild', 'Banner']
				},
				'private' : {
					'input':
						['EMail*', 'Vorname*', 'Nachname*', 'Land*', 'Stadt*', 'PLZ*', 'Hausnummer*', 'Straße*', 'Passwort*', 'Telefon', 'Passwortwiederholung*'],
					'upload':
						['Profilbild']
				}

			}
		});
	});

	app.get('/register/style.css', function(req, res, next) {
		res.sendfile(__dirname +'/_style.css');
	});
	app.get('/register/scripts.js', function(req, res, next) {
		res.sendfile(__dirname+'/_script.js');
	});
}