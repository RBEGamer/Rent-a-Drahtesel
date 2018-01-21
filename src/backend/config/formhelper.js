var addInhibitor  = function(formelements, field,functionname, inhibitorfunctionnames) {
    var newformelements = formelements;
    for(var i = 0; i < newformelements[field].validation.length; i++) {
        if(newformelements[field].validation[i].name === functionname) {
            if(!newformelements[field].validation[i].inhibitor) {
                newformelements[field].validation[i].inhibitor = [];
            }
            for(var j = 0; j < inhibitorfunctionnames.length; j++) {
                newformelements[field].validation[i].inhibitor.push(inhibitorfunctionnames[j]);
            }
        }
    }
    return newformelements;
}

var deleteValidationFunction = function(formelements, field, functionname) {
    var newformelements = formelements;
    var pos = 0; 
    for(var i = 0; i < newformelements[field].validation.length; i++) {
        if(newformelements[field].validation[i].name === functionname) {
            pos = i;
            break;
        }
    }

    newformelements[field].validation.splice(i,1);
    return newformelements;

}
module.exports=  {
    addInhibitor : addInhibitor,
    deleteValidationFunction: deleteValidationFunction
}