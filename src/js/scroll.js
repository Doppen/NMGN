var imgAndPos = [];

window.addEventListener("scroll", function (event) {
    var scroll = this.scrollY;
});
//2250







window.onload = function(){
  for (var i = 0; i < imgArr.length; i++) {
    //console.log(    getOffset(document.getElementById(imgArr[i])).top    );
    imgAndPos.push([imgArr[i], getOffset(document.getElementById(imgArr[i])).top]);
    //imgAndPos[i][1] = getOffset(document.getElementById(imgArr[i]).top);
  }
  console.log(imgAndPos);
};




// get top value of element
function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY
  };
}
