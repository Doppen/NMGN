// get all headers 2 and 3.
var elems = document.querySelectorAll('h2');
//console.log(elems);

// adb anchor link to each header
for (var i = 0; i < elems.length; i++) {
    //var hId = elems[i].getAttribute( 'id' );
    var hId = elems[i].innerHTML.replace(/ /g,"_");
    hId = hId.replace('<span_class="Bold">','');
    hId = hId.replace('</span>','');
    document.body.innerHTML = document.body.innerHTML.replace('<h2>', '<a id="l'+hId+'"></a><h2 id="'+hId+'" >');
}


// Generate a navigation list
var headerNavigation = '';
var linkClass = '';
for (var i = 0; i < elems.length; i++) {
    linkClass = '';
    var hId = elems[i].innerHTML.replace(/ /g,"_");
    hId = hId.replace('<span_class="Bold">','');
    hId = hId.replace('</span>','');
    var hTxt = elems[i].innerText;
    var hTag = elems[i].tagName;

    headerNavigation = headerNavigation+'<a href="#l'+hId+'" class="'+linkClass+'">'+hTxt+'</a>';
}

document.getElementById("subNavigation").innerHTML = headerNavigation;

var classname = document.querySelectorAll(".noot");
var closeName = document.querySelectorAll(".handleCloseNote");


var loca = document.getElementById("loca").getBoundingClientRect().left;
//alert(loca);


// put note in aside
var handleNote = function() {

    var attribute = this.querySelector("a").getAttribute("id");
    attribute = attribute.replace("-ref", "");
    var notenumber = attribute.replace("endnote-", "");
    noteContent = document.getElementById(attribute).innerHTML;
    noteContent = noteContent.replace("↑", "");
    document.getElementById("asideNoteNumber").innerHTML= notenumber;
    document.getElementById("asideNoteContent").innerHTML= noteContent;
    //
    document.getElementById("showNote").style.display= 'flex';
    //alert(this.offsetTop);

    if (window.matchMedia("(min-width: 1200px)").matches) {
      console.log(this.getBoundingClientRect().top+window.pageYOffset-20);
      document.getElementById("showNote").style.top= this.getBoundingClientRect().top+window.pageYOffset-20+'px';
      document.getElementById("showNote").style.left= loca+30+'px';
    }
};

function closeNote() {
  document.getElementById("showNote").style.display= 'none';
}


// remove anchor click
for (var i = 0; i < classname.length; i++) {
    classname[i].querySelector("a").removeAttribute('href');
    classname[i].addEventListener('click', handleNote, false);
}

for (var i = 0; i < closeName.length; i++) {
    closeName[i].addEventListener('click', closeNote, false);
}

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

//viewport dimentions
var elem = (document.compatMode === "CSS1Compat") ?
document.documentElement :
document.body;
var vpHeight = elem.clientHeight;
var vpWidth = elem.clientWidth;
var switchpoint = .33*vpHeight;


var imgAndPos = [];


// if being scrollt set the right images
window.addEventListener("scroll", function (event) {
    var scroll = this.scrollY;
    var msg;
    var loopAmount =imgAndPos.length-1

    for (var j = 0; j < loopAmount; j++) {
      if ((scroll >= (imgAndPos[j][1]-switchpoint)) && (scroll <= (imgAndPos[j+1][1]-switchpoint))) {
        handleImage(imgAndPos[j][0]);
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

  // place the first image
  handleImage(imgAndPos[0][0]);
};




// get top value of element
function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY
  };
}
