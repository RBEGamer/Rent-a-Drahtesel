var models = require('./models.js');
var Regex = require("regex");


var ValidationFunctions = function() {
	this.notOptional = function(data) {
		if (data.value === "" || data.value === null) { 
			return {value: false, error: "Feld muss ausgefüllt sein!"};
		}
		return {value: true};
	}

	this.notUndefined = function(data) {
		if(data.value === "" || data.value==='' || data.value === null || data.value === undefined) {
			return {value: false, error: "Da ist ewas schief gelaufen!"};
		}	
		return {value: true};
	}
	this.isMail = function(data) {
		var regex = /\S+@\S+\.\S+/;
		var valide = regex.test(data.value)
		if(!valide) {
			return {value: false, error: "Die Email hat kein gültiges Format!"};
		}

		return {value: true};
	}

	this.isUnique = function(data) {
		/*var findData = {};
		findData[data.data.field] = data.value;
		console.log("formvalidationdunctions- is unique: ", data);
		console.log("formvalidationdunctions- is unique: ", findData);
		models.findOne(data.data.model, findData, function(rows) {
			console.log(rows);
			if(rows.length > 0) return {value: false, error: "Diese Email Adresse ist schon registriert!"};
			return {value: true};
		});*/
		return {value: true};
	}
	this.isInArray = function(data) {
		if(data.data.array.indexOf(data.value) >= 0) {
			return {value: true};
		}
		return {value: false, error: "Eintrag muss den Elementen der Datalist entsprechen!"};

	}

	this.isNumeric = function(data) {
		if(!data.value){return {value: true}};
		if(parseFloat(data.value) == data.value)
			return {value: true};
		return {value: false, error: "Eintrag muss eine Zahl sein."};

	}

	this.lengthInRange = function(data) {
		if(data.value.length >= data.data.min && data.value.length <= data.data.max) 
			return {value: true};
		return {value: false, error: "Eintrag muss zwischen " + data.data.min + " und " + data.data.max + " Zeichen lang sein."};

	}

	this.suffix = function(data) {
		return {value: true};
	}

	this.isUrl = function(data) {
		return {value: true};
	}

	this.isSame = function(data) {
		if(data.connected.value === data.value )
			return {value: true}
		return {value: false, error: "Feld muss mit " + data.connected.text + " übereinstimmen!"};

	}
	
}

module.exports = new ValidationFunctions();