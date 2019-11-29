document.addEventListener("keyup", function(event) {
  // 13 enter / 27 esc / 16 shift / 220 \
  if (event.which == 220 || event.keyCode == 220) {
          helpColor();
          return false;
      }
      return true;
});




//
var visState = false;
function helpColor() {
  // set the classes and the colors
  var classesArr = [ ['helpColor1', '#ece1f0'], ['helpColor2', '#e1f0ef'], ['helpColor3', '#eeeedd'] ];
  if (!visState) {
    // find all elements with the classes and set the bg color
    for (var i = 0; i < classesArr.length; i++) {
      var selectedClasses = document.getElementsByClassName(classesArr[i][0]);
      for (var j = 0; j < selectedClasses.length; j++) {
        selectedClasses[j].style.backgroundColor = classesArr[i][1];
      }
    }
    visState = true;
  }else {
    // find all elements with the classes and set the remove the bg
    for (var i = 0; i < classesArr.length; i++) {
      var selectedClasses = document.getElementsByClassName(classesArr[i][0]);
      for (var j = 0; j < selectedClasses.length; j++) {
        selectedClasses[j].style.backgroundColor = 'transparent';
      }
    }
    visState = false;
  }
}
