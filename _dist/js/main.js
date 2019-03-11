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
    noteContent = document.getElementById(attribute).innerHTML;
    document.getElementById("chapterIllustration").innerHTML= noteContent;
};

// handle click
for (var i = 0; i < classnameImg.length; i++) {
  if (window.matchMedia("(min-width: 1200px)").matches) {
    classnameImg[i].addEventListener('click', changeImage, false);
  } else {
    classnameImg[i].addEventListener('click', classnameCapt, false);
  }
}





// open caption


var openCaption = function() {
    var captionDiv = this.querySelector(".moreCaption");
    captionDiv.style.display = 'flex';
};

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
