module.exports = {
    commercial: [
    	{text: 'Firma*', input: {type: 'text', name: 'firma'}, validation: ['notOptional']},
    	{text: 'Email*', input: {type: 'text', name: 'email'}, validation : ['isMail', 'notOptional']},
    	{text: 'Land*',  input: {list: 'countries', name: 'land', class: 'autofill'}, validation: ['isLand','notOptional']},
    	{text: 'Stadt*', input: {type: 'text', name: 'stadt'}, validation: ['isCity','notOptional']},
    	{text: 'PLZ*', input: {type: 'text', name: 'plz'}, validation: ['isNumeric', 'notOptional']},
    	{text: 'Straße*', input: {type: 'text', name: 'strasse'}, validation: ['isStreet', 'notOptional']},
    	{text: 'Hausnummer*', input: {type: 'text', name: 'hausnummer'}, validation: ['isNumeric','notOptional']},
    	{text: 'Passwort*', input: {type: 'text', name: 'passwort'},validation: ['notOptional']},
    	{text: 'Passwortwiederholung*', input: {type: 'text', name: 'passwortwdh'}, validation: ['isSame', 'notOptional']},
    	{text: 'Twitter', input: {type: 'text', name: 'twitter'}}, 
    	{text: 'Instagram', input: {type: 'text', name: 'instagram'}},
    	{text: 'Facebook', input: {type: 'text', name: 'facebook'}},
    	{text: 'Telefon', input: {type: 'text', name: 'phone'}},
    	{text: 'Bild', input: {type: 'file', name: 'imgurl', validation: ['suffix']}},
    	{text: 'Banner', input: {type: 'file', name: 'bannerurl', validation: ['suffix']}}
    	],
    private: [
    	{text: 'Vorname*', input: {type: 'text', name: 'vorname'}, validation: ['notOptional']},
    	{text: 'Nachame*', input: {type: 'text', name: 'nachname'}, validation: ['notOptional']},
    	{text: 'Email*', input: {type: 'text', name: 'email'}, validation : ['isMail', 'notOptional']},
    	{text: 'Land*',  input: {list: 'countries', name: 'land'}, validation: ['isLand','notOptional']},
    	{text: 'Stadt*', input: {type: 'text', name: 'stadt'}, validation: ['isCity','notOptional']},
    	{text: 'PLZ*', input: {type: 'text', name: 'plz'}, validation: ['isPlz', 'notOptional']},
    	{text: 'Straße*', input: {type: 'text', name: 'strasse'}, validation: ['isStreet', 'notOptional']},
    	{text: 'Hausnummer*', input: {type: 'text', name: 'hausnummer'}, validation: ['isNumeric','notOptional']},
    	{text: 'Telefon', input: {type: 'text', name: 'phone'}},
    	{text: 'Passwort*', input: {type: 'text', name: 'passwort'},validation: ['notOptional']},
    	{text: 'Passwortwiederholung*', input: {type: 'text', name: 'passwortwdh'}, validation: ['isSame', 'notOptional']},   
    	{text: 'Profilbild', input: {type: 'file', name: 'imgurl'}, validation: ['suffix']},
    	]  	
};