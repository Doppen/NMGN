function bigImageViewer() {
  document.getElementById("bigImageViewer").style.display= 'flex';

  document.getElementById('bigImageViewerFrame').innerHTML = '<img src="images/'+activeImage+'" id="bigImageViewerImage"/>';
}



function closeBigImage() {
  document.getElementById("bigImageViewer").style.display= 'none';
}
