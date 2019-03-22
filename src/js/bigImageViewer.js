function bigImageViewer() {
  document.getElementById("bigImageViewer").style.display= 'flex';
  document.getElementById('zoomFig').style.backgroundImage = 'url(\'images/d1h1/d1h1-big/'+activeImage+'\')';
  document.getElementById('zoomImg').setAttribute('src', 'images/d1h1/d1h1-600/'+activeImage);
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
  x = offsetX / zoomer.offsetWidth * 100;
  y = offsetY / zoomer.offsetHeight * 100;
  zoomer.style.backgroundPosition = x + '% ' + y + '%';
}
