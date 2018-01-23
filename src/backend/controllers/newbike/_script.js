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
                var lat = undefined; var lon = undefined;
                if (status == google.maps.GeocoderStatus.OK) {
                    var lat = results[0].geometry.location.lat();
                    var lon = results[0].geometry.location.lng();
                }
                callback(lat, lon);
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
                    console.log(response);
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
                        console.log(forms);
                        
                        $.ajax({
                            type: "POST",
                            url: "/bike/new",
                            data: forms,
                            success: function( response ) {
                                    
                                    window.location.href = response.redirect;
                                
                            }
                        });
                    });

                   
                    
                }
            });

            return false;
        });

        function validate(callback) {
            var error = {};
            var name = $('input[name="Name"').val();
            var description = $('textarea[name="Description"').val();
            var start_date = $('input[name="start_date"').val();
            var end_date = $('input[name="end_date"').val();
            var prize = $('input[name="Price"').val();
            var threeday = $('input[name="Threeday"').val();
            var sevenday = $('input[name="Sevenday"').val();
            var zip = $('input[name="Zip"').val();
            console.log(name);
            console.log(description);
            console.log(start_date);
            console.log(end_date);
            console.log(prize);
            console.log(threeday);
            console.log(sevenday);
            if(counter < 2) {
                error.picture = {text: "Bilder: ", error: "Es müssen mindestens zwei Bilder hochgeladen werden!"};
            }

            if(start_date === "" || end_date === "") {
                error.date = {text: "Kalender: ", error: "Wähle ein Start- und ein Enddatum aus!"};
            }

            if(name.length === "") {
                error.name = {text: "Name: ", error: "Muss ausgefüllt werden."};
            }
            if(description.length > 300)
            {
                error.description = {text: "Beschreibung: ", error: "Beschreibung ist zu lang."};
            }
            if(description === "") {
                error.description = {text: "Beschreibung: ", error: "Muss ausgefüllt sein."};
            }

            if(threeday = "" || !isNumeric(threeday) || threeday < 0 || threeday > 100) {
                error.threeday = {text: "3 Tages Rabatt: ", error: "Zahl muss zwischen 0 und 100 liegen."};
            }

            if(sevenday = "" || !isNumeric(sevenday) || sevenday < 0 || sevenday > 100) {
                error.sevenday = {text: "7 Tages Rabatt: ", error: "Zahl muss zwischen 0 und 100 liegen."};
            }

            if(prize < 0 || !isNumeric(prize)) {
                error.prize = {text: "Preis: ", error: "Preis muss eine Zahl größer 0 sein!"};
            }

            getLatLon(function(lat, lon) {
                if(!lat || !lon) {
                    error.locals = {text: "Stadt, Straße, Land, Hausnummer: ", error: "Wir konnten keine Ortsangabe aus diesen Daten ermitteln!"};
                }
                console.log("ERROR: ", error);
                callback({error: error, value: (Object.keys(error).length === 0)});
            });
        }

        function showValidations(error) {
            console.log("SHOWVALIDATIONS: ", error);
            $("#errors").empty();
            $("#errors").append("<div class='column-md-6'></div>");
            for(var key in error) {
                console.log(error[key].text + ": " + error[key].error);
                    $("#errors").append("<div class='column-md-9 white margin padding'><b>" + error[key].text + "</b> " + error[key].error + "</div>");
            }
            $("#errors").append("</div>");
        }

        function isNumeric(value) {
            
            if(parseFloat(value) == value)
                return true;
            return false;
    
        }

        $('#upload').click(function(e) {
            $("#imagecounter").attr("value", counter);
            $("#bikeupperform").append('<input type="hidden" name="imagecounter" value="' + counter + '"/>');
            validate(function(value) {
                if(value.value) {
                    $('#uploadForm').submit();
                } else {
                    showValidations(value.error);
                }
            });
            
        });  





    });