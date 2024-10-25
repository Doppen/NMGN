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

// get all headers 2 and 3.
var elems = document.querySelectorAll('h2, h3');
//console.log(elems);

// adb anchor link to each header
for (var i = 0; i < elems.length; i++) {
    //var hId = elems[i].getAttribute( 'id' );
    var hId = elems[i].innerHTML.replace(/ /g,"_");
    hId = hId.replace('<span_class="Bold">','');
    hId = hId.replace('</span>','');
    //console.log(hId);
    document.body.innerHTML = document.body.innerHTML.replace('<h2>', '<a id="l'+hId+'"></a><h2 id="'+hId+'" >');
    //document.body.innerHTML = document.body.innerHTML.replace('<h3>', '<a id="l'+hId+'"></a><h3 id="'+hId+'" >');
}


// Generate a navigation list
var headerNavigation = '';
var linkClass = '';
for (var i = 0; i < elems.length; i++) {
    linkClass = '';
    var hId = elems[i]//.innerHTML //.replace(/ /g,"_");

    var hIdSup = hId.querySelector('span');
    //console.log(hId);
    if (hIdSup !== null) {
      hId.removeChild(hIdSup);
    }

    hId = hId.innerHTML.replace(/ /g,"_");

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
    //console.log(this);
    attribute = attribute.replace("-ref", "");
    var notenumber = attribute.replace("endnote-", "");
    //console.log(attribute);
    noteContent = document.getElementById(attribute).innerHTML;
    noteContent = noteContent.replace("↑", "");
    document.getElementById("asideNoteNumber").innerHTML= notenumber;
    document.getElementById("asideNoteContent").innerHTML= noteContent;
    //
    document.getElementById("showNote").style.display= 'flex';
    //alert(this.offsetTop);

    if (window.matchMedia("(min-width: 1200px)").matches) {
      //console.log(this.getBoundingClientRect().top+window.scrollY-20);
      document.getElementById("showNote").style.top= this.getBoundingClientRect().top+window.scrollY-20+'px';
      document.getElementById("showNote").style.left= loca+30+'px';
    }
};

function closeNote() {
  document.getElementById("showNote").style.display= 'none';
}


// remove anchor click
for (var i = 0; i < classname.length; i++) {
    console.log(classname[i]); 
    classname[i].querySelector("a").removeAttribute('href');
    classname[i].addEventListener('click', handleNote, false);
}

for (var i = 0; i < closeName.length; i++) {
    closeName[i].addEventListener('click', closeNote, false);
}

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
  //console.log(imageId);
  activeImage=imageId;
  // get ID
  var elem = document.getElementById(imageId);
  //elem.style.border = '3px solid rgb(20, 25, 231)';

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
  //console.log(imagefile);
  var elem = document.getElementById(imagefile);

  var elemImage = elem.getElementsByTagName("span")[0].getElementsByTagName("img")[0];
  var imgWidth = elemImage.naturalWidth;
  var imgHeight =elemImage.naturalHeight;
  var dimensionRatio = imgHeight / imgWidth;

  var placedImg = document.getElementById(placeId).getElementsByTagName("img")[0];

  //console.log(imagefile,imgHeight / imgWidth);

  if (dimensionRatio < .7) {
    placedImg.removeAttribute("class");
    placedImg.classList.add("imgFillW");

  }
  else {
    placedImg.removeAttribute("class");
    placedImg.classList.add("imgFillH");
  }

  //return imageId;
}

//viewport dimentions
var elem = (document.compatMode === "CSS1Compat") ?
document.documentElement :
document.body;
var vpHeight = elem.clientHeight;
var vpWidth = elem.clientWidth;
var switchpoint = .2*vpHeight;


var imgAndPos = [];


// if being scrollt set the right images
window.addEventListener("scroll", function (event) {
  //console.log(this.scrollY,getOffsetBottom(document.getElementById('subNavigation')).bottom);


    var scroll = this.scrollY;
    var msg;
    var loopAmount =imgAndPos.length-1

    for (var j = 0; j < loopAmount; j++) {
      if ((scroll >= (imgAndPos[j][1]-switchpoint)) && (scroll <= (imgAndPos[j+1][1]-switchpoint))) {
        if (scrollChange) {
          handleImage(imgAndPos[j][0]);
        }

      }
    }

    if (scroll > getOffsetBottom(document.getElementById('subNavigation')).bottom) {

      document.getElementById('mgSiteFixed').style.zIndex = 200;
      document.getElementById('theContent').style.zIndex = '1220 !important';

    } else {

      document.getElementById('mgSiteFixed').style.zIndex = 0;
      document.getElementById('theContent').style.zIndex = 10;
      theContent
    }


});





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
  //handleImage('-170'+imgArr[0]);
};



// get top value of element
function getOffset(el) {
  //console.log(el);
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY
  };
}


// get top value of element
function getOffsetBottom(el) {
  //console.log(el);
  const rect = el.getBoundingClientRect();
  return {
    bottom: rect.bottom + window.scrollY
  };
}

function closeNav() {
  document.getElementById("popNavigation").style.display= 'none';
}

function OpenNav() {
  document.getElementById("popNavigation").style.display= 'flex';
}

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


var searchField = document.getElementById("searchTerm").value;

document.addEventListener("DOMContentLoaded", function(){
  var q = getUrlParameter('s');
  if (q != '') {
    var theContent = document.getElementById('theContent').innerHTML;
    const regex = new RegExp(q, 'g');
    theNewContent = theContent.replace(regex, '<span class="mgHighlight">'+q+'</span>');
    document.getElementById('theContent').innerHTML = theNewContent;
  }

    console.log(q);
});


function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


function getResultsData() {


  let results = index.search(searchField);

  var resultList='';
  var arrayLength = results.length;

  var part = 0;
  for (var i = 0; i < arrayLength; i++) {
    if (results[i].doc.part != part) {
      //resultList+= '<div><strong>Deel '+results[i].doc.part+'</strong></div>'

    }
    resultList += '<div class="resultItem"><a href="'+results[i].doc.ref+'?s='+searchField+'">'+results[i].doc.title+'</a><br>Deel '+results[i].doc.part+' hoofdstuk '+results[i].doc.chapter+'</div>';
    part = results[i].doc.part ;
  }
  return resultList;

}

function ShowResults() {

  searchField = document.getElementById("searchTerm").value;
  var output = 'Gezocht op "<em>' + searchField+'</em>"';

  output = output+'<br><br>'+getResultsData()

  document.getElementById('results').innerHTML = output;
}
