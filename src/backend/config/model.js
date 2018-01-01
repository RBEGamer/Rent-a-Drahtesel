module.exports = function(name, data, path) {
	var self = this;
	this.primaryKeys = [];
	this.subModels = []
	this.name = name;
	this.hierarchie = [];

	this.setPath = function(d) {
		for(var i = d.length -1 ; i >= 0; i--) {
			this.hierarchie.push(d[i]);
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
			for(var i = 0; i < tmpModel.length; i++) {
				var col = tmpModel[i];
				if(col.Key === 'Pri') {
					self.primaryKeys.push(col.Key);
					continue;
				}
			}
		});
	}


	this.getPrimaryKey(data);
	this.splitData(data);
	this.setPath(path);
}