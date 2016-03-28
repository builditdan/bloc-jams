//Use a loop to go through all elements in the points array.
//Execute a callback for each element.


var forEach = function(callback) {
  //pointsArray = document.getElementsByClassName('point');
  for (var i = 0; i < pointsArray.length; i++) {
    callback(i);
  }  
  
};