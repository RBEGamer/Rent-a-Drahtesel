
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

  

 
 
});
