$(document).ready(function () {
    var mode = "registerprivat";
    loadMode();

    function sendFiles(e) {
         e.preventDefault();
            console.log("kommt an!");   
            var geocoder = new google.maps.Geocoder();
            var street = $("#" + mode + " input[name='street']").val();
            var city = $("#" + mode + " input[name='city']").val();
            var country = $("#" + mode + " input[name='country'").val();
            var housenumber = $("#" + mode + " input[name='housenumber']").val();
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
    }

    $('#registerprivat').submit(sendFiles);
   

    var datafields = [];



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
            $('#registerprivat').unbind('submit');
            $('#registercommercial').submit(sendFiles);
        } else {
            mode = 'registerprivat';
            $('#registercommercial').unbind('submit');
            $('#registerprivat').submit(sendFiles);
        }
        loadMode();
    });

  

 
 
});