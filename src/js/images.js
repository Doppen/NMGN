var activeImage='';
var classnameImg = document.querySelectorAll(".inlineImage");
var scrollChange = true;

// remove put note in aside
var changeImage = function() {
    var attribute = this.getAttribute("id");
    handleImage(attribute);
    //noteContent = document.getElementById(attribute).innerHTML;
    //document.getElementById("chapterIllustration").innerHTML= noteContent;
};

// handle click
for (var i = 0; i < classnameImg.length; i++) {
  if (window.matchMedia("(min-width: 1000px)").matches) {
    classnameImg[i].addEventListener('click', changeImage, false);
    classnameImg[i].addEventListener('click', imageClickOrganiser, false);
  } else {
    classnameImg[i].addEventListener('click', classnameCapt, false);
  }
}

function imageClickOrganiser() {
  scrollChange = false;
}


function handleImage(imageId) {
  activeImage=imageId;
  // get ID
  var elem = document.getElementById(imageId);

  //place image
  var elemImage = elem.getElementsByTagName("img")[0].getAttribute('src');
  var elemImage = elemImage.replace("-170", "-600");
  //document.getElementById("chapterIllustrationImage").innerHTML= elemImage;
  document.getElementById('chapterIllustrationImage').getElementsByTagName("img")[0].setAttribute('src', elemImage);

  //Place caption
  var elemImage = elem.getElementsByClassName("caption")[0].innerHTML;
  document.getElementById("chapterIllustrationCaption").innerHTML= elemImage;

  imageDimentions(imageId, 'chapterIllustrationImage');

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





// set dimentions of the image
function imageDimentions(imagefile, placeId) {
  console.log(imagefile);
  var elem = document.getElementById(imagefile);

  var elemImage = elem.getElementsByTagName("span")[0].getElementsByTagName("img")[0];
  var imgWidth = elemImage.naturalWidth;
  var imgHeight =elemImage.naturalHeight;

  var placedImg = document.getElementById(placeId).getElementsByTagName("img")[0];

  if (imgHeight < imgWidth) {
    placedImg.removeAttribute("class");
    placedImg.classList.add("imgFillW");

  }
  else {
    placedImg.removeAttribute("class");
    placedImg.classList.add("imgFillH");
  }


  //return imageId;
}
