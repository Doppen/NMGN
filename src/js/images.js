var classnameImg = document.querySelectorAll(".inlineImage");

// remove put note in aside
var changeImage = function() {
    var attribute = this.getAttribute("id");
    handleImage(attribute);
    //noteContent = document.getElementById(attribute).innerHTML;
    //document.getElementById("chapterIllustration").innerHTML= noteContent;
};

// handle click
for (var i = 0; i < classnameImg.length; i++) {
  if (window.matchMedia("(min-width: 1200px)").matches) {
    classnameImg[i].addEventListener('click', changeImage, false);
  } else {
    classnameImg[i].addEventListener('click', classnameCapt, false);
  }
}




function handleImage(imageId) {
  // get ID
  var elem = document.getElementById(imageId);

  //place image
  var elemImage = elem.getElementsByTagName("span")[0].innerHTML;
  document.getElementById("chapterIllustrationImage").innerHTML= elemImage;

  //Place caption
  var elemImage = elem.getElementsByClassName("caption")[0].innerHTML;
  document.getElementById("chapterIllustrationCaption").innerHTML= elemImage;

  imageDimentions(imageId);

  //var attribute = elem.getAttribute("id");
  //imageDiv = document.getElementById(attribute).innerHTML;
  //document.getElementById("chapterIllustration").innerHTML= imageDiv;
}


// open caption

var openCaption = function() {
    var captionDiv = this.querySelector(".moreCaption");
    captionDiv.style.display = 'flex';
};

function classnameCapt() {}


function imageDimentions(imagefile) {
  var elem = document.getElementById(imagefile);
  //console.log(elem);
  var elemImage = elem.getElementsByTagName("span")[0].getElementsByTagName("img")[0];
  console.log(elemImage.naturalWidth);
  console.log(elemImage.naturalHeight);


  //return imageId;
}
