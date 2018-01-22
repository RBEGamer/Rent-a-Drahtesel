$(document).ready(function () {
    var mode = ($('#starter').attr('class') === "" ? "registerprivat" : $('#starter').attr('class')); 
    console.log(mode);
    loadMode();

    /*function sendFiles(e) {
            e.preventDefault();
            console.log("kommt an bei sendfiles!");   
            var geocoder = new google.maps.Geocoder();
            console.log(geocoder);
            var street = $("#" + mode + " input[name='street']").val();
            var city = $("#" + mode + " input[name='city']").val();
            var country = $("#" + mode + " input[name='country'").val();
            var housenumber = $("#" + mode + " input[name='housenumber']").val();
            var obj = $(this);
            var adress = country + " " + city + " " + street + " " + housenumber;
            var latitude = "50";
            var longitude = "6";
            $('#' + mode + " input[name='lon']").attr("value", longitude);
            $('#' + mode + " input[name='lat']").attr("value", latitude);
            $('#' + mode).unbind('submit');
            $('#' + mode).submit();
            return true;
            /*console.log(adress);
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
                $('#' + mode + " input[name='lon']").attr("value", longitude);
                $('#' + mode + " input[name='lat']").attr("value", latitude);
                $('#' + mode).unbind('submit');
                $('#' + mode).submit();
                return true;
                
            }
    

    $('#' + mode).submit(sendFiles);*/
   

    var datafields = [];



    function loadMode() {
        console.log(mode);
        $('form').each(function() {
          if($(this).attr("id").indexOf(mode) > -1) {
              $(this).show();
          } else {
              $(this).hide();
          }
        });
    }
    

    $('#chkProfile').change(function() {
        console.log("check kommt an!");
        console.log(mode);
        if($(this).prop('checked')) {
            mode = 'registercommercial';
            $('#registerprivat').unbind('submit');
            $('#registercommercial').submit(sendFiles);
        } else {
            mode = 'registerprivat';
            $('#registercommercial').unbind('submit');
            $('#registerprivat').submit(sendFiles);
        }
        $('form').each(function() {
            $(this).hide();
        });
        $('form').each(function() {
            if($(this).attr("id").indexOf(mode) > -1) {
                $(this).show();
            }
        });
        $('#' + mode).each(function() {
            if($(this).attr('type') != 'hidden') {
                $(this).attr('value', '');
            }
        });
        $('#errorField').empty();
    });

    $('#' + mode + "_upload").click(function() {
        var geocoder = new google.maps.Geocoder();
        var street = $("#" + mode + " input[name='street']").val();
        var city = $("#" + mode + " input[name='city']").val();
        var country = $("#" + mode + " input[name='country'").val();
        var housenumber = $("#" + mode + " input[name='housenumber']").val();
        var obj = $(this);
        var adress = country + " " + city + " " + street + " " + housenumber;
        var latitude = "50";
        var longitude = "6";
        $('#' + mode + " input[name='lon']").attr("value", longitude);
        $('#' + mode + " input[name='lat']").attr("value", latitude);
        $('#' + mode).submit();
    });

 
 
});