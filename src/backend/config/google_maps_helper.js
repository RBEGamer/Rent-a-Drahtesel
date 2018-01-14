var NodeGeocoder = require('node-geocoder');
var cred = require('./credentials.js');


var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: cred.google_map_api,
  formatter: null
};

var geocoder = NodeGeocoder(options);

module.exports = function get_maps_info_adress(_country,_city, _street, _number){
  return get_maps_info(_country + " " + _city + " " + _street + " " + _number)
}


module.exports= function get_maps_info(_map_combiner){
geocoder.geocode(_map_combiner)
  .then(function(res) {
    if(res == null  || res.length > 0){
      return{
        "lat":-1,
        "lon":-1
      }
    }
    console.log(res[0].latitude)
    console.log(res[0].longitude)
    return {
      "lat": res[0].latitude,
      "lon": res[0].longitude
    }
  })
  .catch(function(err) {
    console.log(err);
  });
}

//console.log(get_maps_info_adress("Deutschland", "Aachen", "Krugenofen" , "15"))


