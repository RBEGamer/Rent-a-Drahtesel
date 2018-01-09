  $(document).ready(function () {
    var datafields = [];

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