    $(document).ready(function() {
        function getLatLon(callback) {
            var geocoder = new google.maps.Geocoder();
            var street = $("input[name='Street']").val();
            var city = $("input[name='City']").val();
            var country = $("input[name='Country'").val();
            var housenumber = $("input[name='Housenumber']").val();
            var adress = country + " " + city + " " + street + " " + housenumber;
            console.log("address: ", adress);
            geocoder.geocode( { 'address': adress}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var lat = results[0].geometry.location.lat();
                    var lon = results[0].geometry.location.lng();
                    callback(lat, lon);
                } 
            });

        }

        function handleInput() {
            var file = this.files[0];
            console.log(file);
            var html = '<div class="white margin padding"><label>' + file.name + "</label></div>";
            $('#images').append(html);
            $(this).parent().hide();
            counter++;
            id = "addimagebutton" + counter;
            var newinput = '<label class="btn btn-secondary margin">Hinzufügen<input type="file" target="images" name="userPhoto" id="addimagebutton';
            newinput += counter;
            newinput += '" hidden></label>';
            $('#fileinputs').append(newinput);
            $(this).unbind('change');
            $("#"+id).click(function() {
              $(this).on('change', handleInput);
            });
        }
        var id = "addimagebutton0";
        var counter = 0;
        $("#"+id).click(function() {
          $(this).on('change', handleInput);
        });


        $('#uploadForm').submit(function() {
            $("#status").empty().text("File is uploading...");

            $(this).ajaxSubmit({

                error: function(xhr) {
                    status('Error: ' + xhr.status);
                },

                success: function(response) {
                    console.log(response)
                    $("#status").empty().text("success");
                    
                    var upperform = $('#bikeupperform').serialize();
                    var downerform = $('#bikedownerform').serialize();
                    var forms = upperform + "&" + downerform;
                    for(var i = 0; i < counter; i++) {
                        var image= response.output[i];
                        forms += "&image=" + image;
                    }
                    getLatLon(function(lat, lon) {
                        forms += "&Lat=" + lat + "&Lon=" + lon;
                        $.ajax({
                            type: "POST",
                            url: "/bike/new",
                            data: forms,
                            success: function( response ) {
                                console.log(response);
                                
                            }
                        });
                    });

                   
                    
                }
            });

            return false;
        });

        $('#upload').click(function() {
            $("#imagecounter").attr("value", counter);
            $('#uploadForm').submit();
        });  





    });