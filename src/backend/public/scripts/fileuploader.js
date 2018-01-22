/*File.prototype.convertToBase64 = function(callback){
        var reader = new FileReader();
        reader.onloadend = function (e) {
            callback(e.target.result, e.target.error);
        };   
        reader.readAsDataURL(this);
	};*/
 	/*$('input').each(function() {
 		if($(this).attr('type') === 'file') {
 			$(this).on('change',function()	{
 				var selectedFile = this.files[0];
        var parent = $(this);
        var name = $(this).attr("target");
        var target = $("input[upload='" + name + "']");
        
        target.val("Lädt hoch!");
        selectedFile.convertToBase64(function(base64) {
          target.val(selectedFile.name);
          $("input[name='" + name + "']").val(base64);
        });
      });
 		}
   });*/
   

   $('input').each(function() {
    if($(this).attr('type') === 'file') {
      $(this).on('change', function() {
        var parentFormID = $(this).attr('parentFormID');
        var target = $(this).attr('target');
        var targetform = $(this).attr('targetform');
        alert(parentFormID);
        $('#' +parentFormID).ajaxSubmit({
          error: function(xhr) {
            console.log('Error: ', xhr.statur);
          },
          success: function(response) {
            //var inputfield = '<input type="hidden" name="' + target + '" value="' + response.output[0] + '" />';
            //$("#" + targetform).append(inputfield);
            console.log(response);
            $('#'+ targetform + ' input[name="' + target + '"]').val(response.output[0]);

          }
        });
      });
    }
   });