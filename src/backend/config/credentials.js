var credentials = {
        'google_map_api': 'AIzaSyATk-avnh0vxDN-qRfcV6SeQWymLmy1gws',
        'database': {
          'host': 'marcelochsendorf.com',
          'user': 'rentrent',
          'password': 'gujZtZuWQKB1X3m1',
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
  "port":3002,
  "port_activation_email": 3000
}


module.exports = {
  "credentials":credentials,
  "config":config
}
