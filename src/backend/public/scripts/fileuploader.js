	File.prototype.convertToBase64 = function(callback){
        var reader = new FileReader();
        reader.onloadend = function (e) {
            callback(e.target.result, e.target.error);
        };   
        reader.readAsDataURL(this);
	};
 	$('input').each(function() {

 		if($(this).attr('type') === 'file') {
 			$(this).on('change',function()	{
 				var selectedFile = this.files[0];
 				var obj = $(this);
          		selectedFile.convertToBase64(function(base64){
            	   obj.next().val(base64);
          		});
 			});
 		}
 	});
