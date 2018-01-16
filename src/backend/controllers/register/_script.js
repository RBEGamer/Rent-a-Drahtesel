
$(document).ready(function () {
    var mode = $('#starter').attr('class');
    $('form').submit(function(e) {
            e.preventDefault();
            console.log("kommt an!");   
            var geocoder = new google.maps.Geocoder();
            var street = $("input[name='street']").val();
            var city = $("input[name='city']").val();
            var country = $("input[name='country'").val();
            var housenumber = $("input[name='housenumber']").val();
            var obj = $(this);
            var adress = country + " " + city + " " + street + " " + housenumber;
            console.log(adress);
            geocoder.geocode( { 'address': adress}, function(results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
                    console.log(latitude, longitude);
                    obj.append("<input type='hidden' name='lat' value='" + latitude + "' />");
                    obj.append("<input type='hidden' name='lon' value='" + longitude + "' />");
                    $('form').unbind('submit');
                    $('#' + mode).submit();
                    return false;
                } 
            });
    });
   

    var datafields = [];

    
    if(mode == "")  {
        console.log("geht in loadmode");
        mode = 'registerprivat';
        loadMode();
    } else {
        $('#' + mode).show();
        if(mode === 'registercommercial') {
            $('#chkProfile').prop('checked', true);
        } else {
            $('#chkProfile').prop('checked', false);
        }
    }

    function loadMode() {
        $('form').each(function() {
            $(this).hide();
        });
        $('input').each(function() {
            if($(this).attr('type') != 'hidden') {
                $(this).attr('value', '');
            }
        });
        $('#errorField').empty();
        $('#' + mode).show();
    }
    

    $('#chkProfile').change(function() {
        
        if($(this).prop('checked')) {
            mode = 'registercommercial';
        } else {
            mode = 'registerprivat';
        }
        loadMode();
    });

  

 
 
});
