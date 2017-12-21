$(document).ready(function () {
 
	var formdata = null; var max = 0; var private = true;
 /*
<div class="formcol">
<div class="col-6 col-md-3 col-lg-2">
    <div class="margin height text">
        <span class="formtext"></span>
    </div>
</div>
<div class="col-6 col-md-3 col-lg-2">
    <div class="margin height">
        <input class="form-control height">
    </div>
</div>
</div>


<div class="formcol">
<div class="col-6 col-md-3 col-lg-2 form-col">
    <div class="margin height text">
        <span class="formtext"></span>
    </div>
</div>
<div class="col-6 col-md-3 col-lg-2">
    <div class="margin height">
        <input class="form-control height">
    </div>
</div>
</div>
 */
 function getMode() {
 	return private ? "private" : "commercial";
 }

 $('#chkProfile').change(function() {
 	 private = !private;
 	 generateForm();
 });

 
 function generateForm() {
 	max = formdata[getMode()].length;
 	var data = formdata[getMode()];
 	$('.formtext').each(function() {
 		var pos = parseInt($(this).attr("element"));
 		if(pos >= max) {
 			$(this).hide();
 		} else {
 			$(this).show();
 			$(this).html(data[pos].text);
 		}
 	});

 	$('.form-control').each(function() {
 		var pos = parseInt($(this).attr("element"));
 		if(pos >= max) {
 			$(this).hide();
 		} else {
 			$(this).show();
            for(var k in data[pos]) 
            {
                console.log(k);
            }
 			$(this).attr("type", data[pos].type);
 			$(this).attr("name", data[pos].name);
 		}
 	});
 }

 
 $.ajax({
	 type: "GET",
	 url: "/register/form",
	 success: function(result)	{
	 	formdata = result;
	 	max = (formdata.commercial.length >	 formdata.private.length ? formdata.commercial.length : formdata.private.length);
	 	generateForm();
	 }
 });
});
