function bigImageViewer() {
  document.getElementById("bigImageViewer").style.display= 'flex';

  document.getElementById('bigImageViewerFrame').innerHTML = '<img src="images/d1h1/d1h1-600/'+activeImage+'" id="bigImageViewerImage"/>';
}



function closeBigImage() {
  document.getElementById("bigImageViewer").style.display= 'none';
}
