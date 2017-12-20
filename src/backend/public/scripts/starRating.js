 function makeSVG(tag, attrs) {
            var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
            for (var k in attrs)
                el.setAttribute(k, attrs[k]);
            return el;
    }

    var x = document.getElementsByClassName("starRating");
    for (var i = 0; i < x.length; i++) {
        
          var steps = x[i].getAttribute("starMax"); 
          var mode = x[i].getAttribute("mode");
          var size = parseInt(x[i].getAttribute("size"));
          if(!size) size = 40;
          var fillColor = x[i].getAttribute("fillColor");
          if(!fillColor) fillColor = 'yellow';
          var scale = size/40;

          x[i].setAttribute("pluginID", i);
          var svg = makeSVG('svg', {xmlns: 'http://www.w3.org/2000/svg',  'xmlns:xlink': 'http://www.w3.org/1999/xlink', width: steps * size, height: size});
          x[i].appendChild(svg);
          for(var j = 0; j <= 2*steps; j+=2) {
            var starLeft= makeSVG('polygon', {pos: j, class: mode, points: '20 0 20 30 5 40 10 25 0 20 13 15' , fill: fillColor, transform: 'translate('+ j*size/2 +') scale(' + scale + ',' + scale + ')'});

            var starRight= makeSVG('polygon', {pos: j+1, class: mode, points: '0 0 0 30 15 40 10 25 20 20 7 15' , fill: fillColor, transform: 'translate('+ (j+1)*size/2 +') scale(' + scale + ',' + scale + ')'});
            svg.appendChild(starLeft);
            svg.appendChild(starRight);
          }
    }


    $(".clickable").hover(function()  {
        var left = $(this);
        var right = $(this).next();
        var emptyColor = $(this).parent().parent().attr("emptyColor");
        if(!emptyColor) emptyColor = 'yellow';
        var hoverColor = $(this).parent().parent().attr("hoverColor");
        console.log(hoverColor);
        if(!hoverColor) hoverColor = 'red';
        while(left.length > 0) {
          left.attr("fill", hoverColor);
          left = left.prev();
        }
        while(right.length > 0) {
          right.attr("fill", emptyColor);
          right = right.next();
        }
    });

    function loadStars() {
       $(".starRating>svg>polygon").each(function() {

          var fillColor = $(this).parent().parent().attr("fillColor");
          if(!fillColor) fillColor = 'orange';
          var emptyColor = $(this).parent().parent().attr("emptyColor");
          if(!emptyColor) emptyColor = 'yellow';
        if(parseInt($(this).attr("pos")) < parseInt($(this).parent().parent().attr("value"))) {
          $(this).attr("fill", fillColor);
        } else {
          $(this).attr("fill", emptyColor);
        }
      });
    }
    loadStars();
    $(".starRating>svg>polygon").mouseleave(loadStars);
    $(".clickable").click(function() {
        var rating = $(this).attr("pos");
        $(this).parent().parent().attr("value", parseInt(rating) + 1);
    });

        