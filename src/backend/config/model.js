module.exports = function(name, data, path) {
	var self = this;
	this.primaryKeys = [];
	this.subModels = []
	this.name = name;
	this.pos = -1;
	this.hierarchie = [];
	this.parent = [];
	this.fields = {};

	this.setPath = function(d) {
		for(var i = d.length -1 ; i >= 0; i--) {
			this.hierarchie.push(d[i]);
			if(d[i] === name)
				pos = i;

		}
	}

	this.splitData = function(d) {
		Object.keys(d).forEach(function(key,index) {
			self.subModels.push(d[key]);
		});
	}
	this.getPrimaryKey = function(d) {
		Object.keys(d).forEach(function(key,index) {

			var tmpModel = d[key];
			var isParent = false;
			for(var i = 0; i < tmpModel.length; i++) {
				var col = tmpModel[i];
				if(col.Key === 'PRI') {
					self.primaryKeys.push(col.Field);
				}
				if(col.Extra === 'auto_increment') {
					isParent = true;
				}
			}
			self.parent.push(isParent)
		});
	}

	this.toString = function() {
		var s = "modelname: " + name + "/n";
	}
	this.setFields = function(d) {
		var tmp = {};
		for(var i = 0; i < this.subModels.length; i++) {
			for(var j = 0; j < this.subModels[i].length; j++) {
					tmp[this.subModels[i][j].Field] = this.hierarchie[i];
			}
		}
		this.fields = tmp;
	}




	this.getPrimaryKey(data);
	this.splitData(data);
	this.setPath(path);
	this.setFields(data);
}