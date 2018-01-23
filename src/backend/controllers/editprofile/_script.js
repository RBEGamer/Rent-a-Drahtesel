$(document).ready(function () {
    $('#upload').click(function() {

            var geocoder = new google.maps.Geocoder();
            var street = $("input[name='street']").val();
            var city = $("input[name='city']").val();
            var country = $("input[name='country'").val();
            var housenumber = $("input[name='housenumber']").val();
            var obj = $(this);
            var target = $(this).attr("target");
            var adress = country + " " + city + " " + street + " " + housenumber;
            geocoder.geocode( { 'address': adress}, function(results, status) {
                var latitude = "";
                var longitude = "";
                console.log("habe lat und lon berechnet!");
                if (status == google.maps.GeocoderStatus.OK) {
                    latitude = results[0].geometry.location.lat();
                    longitude = results[0].geometry.location.lng();
                    console.log(latitude, longitude);
                }
                //obj.append("<input type='hidden' name='lat' value='" + latitude + "' />");
                //obj.append("<input type='hidden' name='lon' value='" + longitude + "' />");
                $("input[name='lon']").attr("value", longitude);
                $("input[name='lat']").attr("value", latitude);
                
            
               
                alert(target);
                $("#" + target).submit();
            });
    });
});