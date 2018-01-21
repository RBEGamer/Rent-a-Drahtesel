var c = require('./countries.js');

module.exports = {
    formelements : {
        'Description' : {text: 'Beschreibung*:', validation: [{name: 'lengthInRange', data: {min: 30, max: 300}}, {name: 'notOptional' }]},
        'Threeday': {text: '3 Tages Rabatt*:', validation: [{name: 'isNumeric'}]},
        'Sevenday': {text: '7 Tages Rabatt*:',validation: [{name: 'isNumeric'}]},
        'Firmenname' :   {text: 'Firma*', input: {type: 'text'}, validation: [{name: 'notOptional'}]},
        'email' :   {text: 'Email*', input: {type: 'text'}, validation : [{name: 'isMail'}, {name: 'notOptional'}]},
        'country'  :   {text: 'Land*',  input: {list: 'countries',  element: 'autofill'}, validation: [{name: 'isInArray', data : {array: c.countries}},{name: 'notOptional'}]},
        'city' :   {text: 'Stadt*', input: {type: 'text'}, validation: [{name: 'notOptional'}]},
        'zip'   :	{text: 'PLZ*', input: {type: 'text'}, validation: [{name: 'isNumeric'} , {name: 'notOptional'}, {name: 'lengthInRange', data: {min: 4, max: 6}}]},
        'street':	{text: 'Straße*', input: {type: 'text'}, validation: [{name: 'suffix', data: {valid: ['straße', 'str', 'strasse']}}, {name: 'notOptional'}]},
        'housenumber':	{text: 'Hausnummer*', input: {type: 'text'}, validation: [{name: 'isNumeric'},{name: 'notOptional'}]},
        'pw':	{text: 'Passwort*', input: {type: 'password'},validation: [{name: 'notOptional'}]},
        'passwortwdh':	{text: 'Passwortwiederholung*', input: {type: 'password'}, validation: [{name: 'isSame', connected: 'pw'}, {name: 'notOptional'}]},
        'WebUrl': {text: 'Website*', input: {type: 'text'}, validation: [{name: 'isUrl'}]},
        'TwitterUrl':	{text: 'Twitter', input: {type: 'text'}}, 
        'InstagramUrl' :{text: 'Instagram', input: {type: 'text'}},
        'FacebookUrl':	{text: 'Facebook', input: {type: 'text'}},
        'phone':	{text: 'Telefon', input: {type: 'text'}, validation: [{name: 'isNumeric'}]},
        'picture':	{text: 'Bild', input: {type: 'file'}, validation: [{name: 'suffix', data: {valid: ['jpg', 'jpeg', 'png']}}]},
        'Banner':	{text: 'Banner', input: {type: 'file'}, validation: [{name: 'suffix', data: {valid: ['jpg', 'jpeg', 'png']}}]},
        'Vorname':	{text: 'Vorname*', input: {type: 'text'}, validation: [{name: 'notOptional'}]},
        'Name': {text: 'Nachame*', input: {type: 'text'}, validation: [{name: 'notOptional'}]},
        'lat': {text: '', input: {type: 'hidden'}, validation: [{name: 'notUndefined', target: ['country', 'city', 'street', 'housenumber']}, {name: 'notOptional'}]},
        'lon': {text: '', input: {type: 'hidden'}, validation: [{name: 'notUndefined', target: ['country', 'city', 'street', 'housenumber']}, {name: 'notOptional'}]}
    },
    forms : {
        'registerprivat' : {
            'elements':
            [
                'email', 'Vorname', 'Name','country', 'city', 'zip', 'housenumber', 'street', 'pw', 'phone', 'passwortwdh', 'picture', 'lat', 'lon'
            ],
            'model': 'Privatbenutzer'
        },
        'registercommercial' : {
            'elements': 
            [
                'email', 'Firmenname', 'street', 'housenumber', 'city', 'zip', 'pw', 'country', 'passwortwdh', 'WebUrl', 'FacebookUrl', 'phone', 'InstagramUrl', 'TwitterUrl', 'picture', 'Banner', 'lat', 'lon'
            ],
            'model': 'Geschaeftsbenutzer'
        },
        'editprivate' : {
            'elements':
            [
                 'Vorname', 'Name','country', 'city', 'zip', 'housenumber', 'street', 'pw', 'phone', 'passwortwdh', 'picture', 'lat', 'lon'
            ],
            'model': 'Privatbenutzer'
        },
        'editcommercial' : {
            'elements':
            [
                 'street', 'country', 'city', 'zip', 'pw', 'WebUrl', 'passwortwdh', 'FacebookUrl', 'phone', 'InstagramUrl', 'TwitterUrl', 'picture', 'Banner', 'lat', 'lon'
            ],
            'model': 'Geschaeftsbenutzer'
        },
        'login' : {
            'elements':
            [
                'email', 'pw'
            ],
            'model': 'Benutzer'
        },
        'fahrradinserieren' : {
            'elements':
            [
                'Name', 'Description', 'Threeday', 'Sevenday', 'City', 'Zip', 'Street', 'Housenumber', 'Country', 'Price' 
            ],
            'model': 'Fahrrad'
        }
    },
    models: 
    {
        'Benutzer' : {
            table: 'Benutzer',
            parent: null
        },
        'Privatbenutzer': {
            table: 'Privatbenutzer',
            parent: 'Benutzer'
        },
        'Geschaeftsbenutzer': {
            table: 'Geschaeftsbenutzer',
            parent: 'Benutzer'
        },
        'Fahrrad': {
            table: 'Fahrrad',
        },
        'BewertungBenutzer' : {
            table: 'BewertungBenutzer',
        },
        'Bestellung' : {
            table: 'Bestellung'
        },
        'Bild' : {
            table: 'Bild'
        }

    }
}