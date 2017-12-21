var base64Img = require('base64-img');
const uuidv1 = require('uuid/v1');


var supported_type = ['png', 'jpg', 'JPG', 'jpeg', 'gif']



//gif, jpg, png

//.png
function type_validator(_extention){
if(_extention == undefined){return false;}
var index = supported_type.indexOf(String(_extention));
if(index >= 0){
  return true
}
index = supported_type.indexOf(String(_extention).replace(".",""));
if(index >= 0){
  return true
}
return false
}

function get_file_extention(_path = ""){
  return (/[.]/.exec(_path)) ? /[^.]+$/.exec(_path) : undefined;
}

//var data = base64Img.base64Sync('path/demo.png');

function base64_covert_to_img(_base64_string, _path){
var filepath = base64Img.imgSync(_base64_string, _path,uuidv1());
return filepath;
}

function img_covert_to_base(_path){
return base64Img.base64Sync(_path);
}
