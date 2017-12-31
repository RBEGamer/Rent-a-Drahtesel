var ValidationFunctions = function() {
	this.notOptional = function(data) {
		if (data.value === "" || data.value === null) { 
			return {value: false, error: "Feld muss ausgefüllt sein!"};
		}
		return {value: true};
	}
	this.isMail = function(data) {
		return {value: true};
	}
	this.isInArray = function(data) {
		return {value: true};
	}

	this.isNumeric = function(data) {
		return {value: true};
	}

	this.lengthInRange = function(data) {
		return {value: true};
	}

	this.suffix = function(data) {
		return {value: true};
	}

	this.isUrl = function(data) {
		return {value: true};
	}

	this.isSame = function(data) {
		return {value: true};
	}
	
}

module.exports = new ValidationFunctions();