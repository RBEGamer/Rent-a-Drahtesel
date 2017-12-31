
$(document).ready(function () {
 
    
    var datafields = [];

    var mode = $('#starter').attr('class');
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

    $('input[element=autofill]').each(function() {
        var data = $(this).attr('list');
        $.ajax({
             type: "GET",
             url: "/register/" + data,
             success: function(result)  {
                if(datafields.indexOf(data) === -1) {
                    var s = '<datalist id="' + data +'">';
                    for(var i = 0; i < result.length; i++) {
                        s += '<option value="' + result[i] + '">';
                    }
                    s+= '</datalist>';
                    $('body').append(s);
                }
                datafields.push(data);
             }
        });
    });

 
 
});
