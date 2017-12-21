module.exports = {
    commercial: [
    	{text: 'Firma*', type: 'text', name: 'firma', validation: ['notOptional']},
    	{text: 'Email*', type: 'text', name: 'email', validation : ['isMail', 'notOptional']},
    	{text: 'Land*', type: 'text', name: 'land', validation: ['isLand','notOptional']},
    	{text: 'Stadt*', type: 'text', name: 'stadt', validation: ['isCity','notOptional']},
    	{text: 'PLZ*', type: 'text', name: 'plz', validation: ['isNumeric', 'notOptional']},
    	{text: 'Straße*', type: 'text', name: 'strasse', validation: ['isStreet', 'notOptional']},
    	{text: 'Hausnummer*', type: 'text', name: 'hausnummer', validation: ['isNumeric','notOptional']},
    	{text: 'Passwort*', type: 'text', name: 'passwort',validation: ['notOptional']},
    	{text: 'Passwortwiederholung*', type: 'text', name: 'passwortwdh', validation: ['isSame', 'notOptional']},
    	{text: 'Twitter', type: 'text', name: 'twitter'}, 
    	{text: 'Instagram', type: 'text', name: 'instagram'},
    	{text: 'Facebook', type: 'text', name: 'facebook'},
    	{text: 'Telefon', type: 'text', name: 'phone'},
    	{text: 'Bild', type: 'file', name: 'imgurl', validation: ['suffix']},
    	{text: 'Banner', type: 'file', name: 'bannerurl', validation: ['suffix']}
    	],
    private: [
    	{text: 'Vorname*', type: 'text', name: 'vorname', validation: ['notOptional']},
    	{text: 'Nachame*', type: 'text', name: 'nachname', validation: ['notOptional']},
    	{text: 'Email*', type: 'text', name: 'email', validation : ['isMail', 'notOptional']},
    	{text: 'Land*', type: 'text', name: 'land', validation: ['isLand','notOptional']},
    	{text: 'Stadt*', type: 'text', name: 'stadt', validation: ['isCity','notOptional']},
    	{text: 'PLZ*', type: 'text', name: 'plz', validation: ['isPlz', 'notOptional']},
    	{text: 'Straße*', type: 'text', name: 'strasse', validation: ['isStreet', 'notOptional']},
    	{text: 'Hausnummer*', type: 'text', name: 'hausnummer', validation: ['isNumeric','notOptional']},
    	{text: 'Telefon', type: 'text', name: 'phone'},
    	{text: 'Passwort*', type: 'text', name: 'passwort',validation: ['notOptional']},
    	{text: 'Passwortwiederholung*', type: 'text', name: 'passwortwdh', validation: ['isSame', 'notOptional']},   
    	{text: 'Profilbild', type: 'file', name: 'imgurl', validation: ['suffix']},
    	]  	
};