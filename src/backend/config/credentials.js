var credentials = {
        'google_map_api': 'AIzaSyD2ikyNk4Adr5oQeIbP2oWRGEKoOHornes',
        'database': {
          'host': 'marcelochsendorf.com',
          'user': 'rent_a_bike',
          'password': 'bike_a_rent',
          'database': 'rent_a_bike',
        },
        'smtp_server':{
          'host': 'smtp.gmail.com',
          'port': 465,
          'secureConnection': true,
          'connection': 'Gmail',
          'protocol':'smtps',
          'auth': {
              'user': 'rent.a.drahtesel%40gmail.com',
              'pass': 'softwarea8'
          },
          'from': 'rent.a.drahtesel%40gmail.com'
        }
}



var config = {
  "image_upload_tmp_path": "./tmp/uploaded_images"
}
//module.exports = credentials
//module.exports = config

module.exports = {
  "credentials":credentials,
  "config":config
}
