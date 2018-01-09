var formdata = require('./formdata');

var Formgenerator = function() {




	this.generate = function(formnames) {
		var e = formdata.formelements;
		var forms = {};
		for(var i = 0; i < formnames.length; i++) {
			var m = formdata.forms[formnames[i]];
			var pos = formnames[i];
			forms[pos] = {};
			forms[pos].elements = [];
			for(var j = 0; j < m.elements.length; j++) {
				var p = m.elements[j];
				e[p].name = p;
				forms[pos].elements.push(e[p]);
			}
			forms[pos].model = m.model;
		}
		return forms;
	}
}
module.exports = new Formgenerator();
