var NodeGeocoder = require('node-geocoder');
var cred = require('./credentials.js');


var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: cred.google_map_api,
  formatter: null
};

var geocoder = NodeGeocoder(options);

function get_maps_info(_country,_city, _street, _number){
  console.log(_country, _city, _street, _number);
  return _get_maps_info(_country + " " + _city + " " + _street + " " + _number)
}


function _get_maps_info(_map_combiner){
  console.log("_get_maps_info");
  console.log(_map_combiner);
geocoder.geocode(_map_combiner)
  .then(function(res) {
    if(res == null  || res.length > 0){
      return{
        lat:-1,
        lon:-1
      };
    }
    console.log("GEOCODE: ", res[0].latitude);
    console.log("GEOCODE: ", res[0].longitude);
    return {
      lat: res[0],
      lon: res.longitude
    };
  })
  .catch(function(err) {
    console.log(err);
  });
}

console.log(get_maps_info("Deutschland", "Aachen", "Krugenofen" , "15"));

module.exports  = {
  get_maps_info: get_maps_info
}
