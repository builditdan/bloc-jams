      var revealPoints = function() {
        
        var points = document.getElementsByClassName('point');

        var revealPoint = function(point_no) {
          points[point_no].style.opacity = 1;
          points[point_no].style.transform = "scaleX(1) translateY(0)";
          points[point_no].style.msTransform = "scaleX(1) translateY(0)";
          points[point_no].style.WebkitTransform = "scaleX(1) translateY(0)";
        }
        
        for (i = 0; i < points.length; i++) {
          revealPoint(i);
        }
       
      };
        
  