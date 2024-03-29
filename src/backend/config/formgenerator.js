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
			forms[pos].files = [];
			for(var j = 0; j < m.elements.length; j++) {
				var p = m.elements[j];
				e[p].name = p;
				if(e[p].input.type === 'file') {
					forms[pos].files.push(e[p]);
				} else {
					forms[pos].elements.push(e[p]);
				}

			}
			forms[pos].model = m.model;
		}
		console.log("formgenerator: ", forms);
		return forms;
	}
}
module.exports = new Formgenerator();
