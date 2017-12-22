var credentials = {
        'google_map_api': 'AIzaSyD2ikyNk4Adr5oQeIbP2oWRGEKoOHornes',
        'database': {
          'host': 'marcelochsendorf.com',
          'user': 'rent_a_bike',
          'password': 'bike_a_rent',
          'database': 'rent_a_bike',
        },
        'smtp_server':{
          'host': 'smtp.strato.de',
          'port': 465,
          'secureConnection': true,
          'connection': 'Gmail',
          'protocol':'smtps',
          'auth': {
              'user': 'no-reply%40rent-a-drahtesel.de',
              'pass': 'bike_a_rent123'
          },
          'from': 'no-reply%40rent-a-drahtesel.de'
        }
}



var config = {
  "image_upload_tmp_path": "./tmp/uploaded_images",
  "image_conversion_path": "./tmp/converted_images",
  "port":8080
}


module.exports = {
  "credentials":credentials,
  "config":config
}
