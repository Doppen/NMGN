function bigImageViewer() {
  //console.log('11');
  var chapterId = document.getElementById("chaperId").innerHTML
  document.getElementById("bigImageViewer").style.display= 'flex';
  document.getElementById('zoomFig').style.backgroundImage = 'url(\'images/'+chapterId+'/'+chapterId+'-big/'+activeImage+'\')';
  document.getElementById('zoomImg').setAttribute('src', 'images/'+chapterId+'/'+chapterId+'-600/'+activeImage);
  imageDimentions(activeImage, 'zoomFig');
}

//id="zoomFig"


function closeBigImage() {
  document.getElementById("bigImageViewer").style.display= 'none';
}

function zoom(e) {
  var zoomer = e.currentTarget;
  e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX;
  e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX;
  x = offsetX / zoomer.offsetWidth * 150;
  y = offsetY / zoomer.offsetHeight * 150;
  zoomer.style.backgroundPosition = x + '% ' + y + '%';
}
