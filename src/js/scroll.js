var imgAndPos = [];

window.addEventListener("scroll", function (event) {
    var scroll = this.scrollY;
    var msg;
    var loopAmount =imgAndPos.length-1

    for (var j = 0; j < loopAmount; j++) {
      if ((scroll >= imgAndPos[j][1]) && (scroll <= imgAndPos[j+1][1])) {
        msg = '###!';
        console.log(imgAndPos[j][0]);
      }
    }

});
//2250







window.onload = function(){
  var tempStoreVal = 0;
  var yPosImage;

  for (var i = 0; i < imgArr.length; i++) {
    yPosImage = getOffset(document.getElementById(imgArr[i])).top;
    if (yPosImage != tempStoreVal) {
      imgAndPos.push([imgArr[i], yPosImage]);
    }
    tempStoreVal = yPosImage;
  }
  imgAndPos.push(['end', 1000000]);
  //console.log(imgAndPos);
};




// get top value of element
function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY
  };
}
