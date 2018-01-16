var lastInsert = 0;
	File.prototype.convertToBase64 = function(callback){
        var reader = new FileReader();
        reader.onloadend = function (e) {
            callback(e.target.result, e.target.error);
        };   
        reader.readAsDataURL(this);
	};
 	$("#addimagebutton").click(function() {
 			$(this).on('change',function()	{
	 				var selectedFile = this.files[0];
			        var parent = $(this);
			        var name = $(this).attr("target");			        
			        selectedFile.convertToBase64(function(base64) {
			        	console.log("new base64 file");
			        	var target = "<input type='text' class='col-6 col-md-offset-3 white margin center' id='insertedImage'" + lastInsert + "' value='" + selectedFile.name + "' />";
			        	var targetinput = "<input type='hidden' name='image' value='" + base64 + "' />";
			          	$('#images').append(target);
			          	$('#insertedImage' + lastInsert).val(target);
			          	$("#addimagebutton").unbind('change');
			          	$('#images').append(targetinput);
			          	lastInsert++;
			        });
      		});
 	});

 	$("#bikepostform").submit(function(e) {
            e.preventDefault();
            console.log("kommt an!");   
            var geocoder = new google.maps.Geocoder();
            var street = $("input[name='street']").val();
            var city = $("input[name='city']").val();
            var country = $("input[name='country'").val();
            var housenumber = $("input[name='housenumber']").val();
            var obj = $(this);
            var adress = country + " " + city + " " + street + " " + housenumber;
            console.log("address: ", adress);
            geocoder.geocode( { 'address': adress}, function(results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
                    console.log(latitude, longitude);
                    obj.append("<input type='hidden' name='lat' value='" + latitude + "' />");
                    obj.append("<input type='hidden' name='lon' value='" + longitude + "' />");
                    $('form').unbind('submit');
                    $('#bikepostform').submit();
                    return false;
                } 
            });

    });