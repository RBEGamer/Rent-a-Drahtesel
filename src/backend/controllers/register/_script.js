$(document).ready(function () {
    var datafields = ['registerprivat', 'registercommercial'];
    var mode = ($('#starter').attr('class') === "" ? "registerprivat" : $('#starter').attr('class')); 
    var pos = (mode === 'registerprivat' ? 0 : 1);
    $('#chkProfile').prop('checked', (mode === 'registercommercial'));
    $('#' + datafields[(pos + 1) % 2] + '_submit').hide();
    $('#' + mode + "_upload").click(submitStuff);
    
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

        $("#" + mode + "_submit").hide();
        $("#" + mode + "_upload").unbind('click');
        pos = (pos + 1) % 2;
        mode = datafields[pos];
        $("#" + mode + "_submit").show();
        $("#" + mode + "_upload").click(submitStuff);

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
        console.log(mode);

    });

    function submitStuff() {
            console.log("kommt bei register an!", $(this).attr("id"));
            var geocoder = new google.maps.Geocoder();
            var street = $("#" + mode + " input[name='street']").val();
            var city = $("#" + mode + " input[name='city']").val();
            var country = $("#" + mode + " input[name='country'").val();
            var housenumber = $("#" + mode + " input[name='housenumber']").val();
            var obj = $(this);
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
                $('#' + mode + " input[name='lon']").attr("value", longitude);
                $('#' + mode + " input[name='lat']").attr("value", latitude);
    
                $('#' + mode).submit();
            });
    }

     

});