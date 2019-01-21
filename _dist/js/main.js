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

    headerNavigation = headerNavigation+'<a href="#l'+hId+'" class="'+linkClass+'">'+hTxt+'</a><br>';
}

document.getElementById("subNavigation").innerHTML = headerNavigation;

var classname = document.querySelectorAll(".noot");


var loca = document.getElementById("loca").getBoundingClientRect().left;
//alert(loca);


// put note in aside
var handleNote = function() {
    var attribute = this.querySelector("a").getAttribute("id");
    attribute = attribute.replace("-ref", "");
    var notenumber = attribute.replace("endnote-", "");
    noteContent = document.getElementById(attribute).innerHTML;
    noteContent = noteContent.replace("↑", "")
    document.getElementById("showNote").innerHTML= '<div class="noteIndex">'+notenumber+'</div>'+noteContent;
    document.getElementById("showNote").style.display= 'flex';
    //alert(this.offsetTop);

    if (window.matchMedia("(min-width: 1200px)").matches) {
      document.getElementById("showNote").style.top= this.getBoundingClientRect().top+window.pageYOffset-20+'px';
      document.getElementById("showNote").style.left= loca+30+'px';
    }


};

// remove anchor click
for (var i = 0; i < classname.length; i++) {
    classname[i].querySelector("a").removeAttribute('href');
    classname[i].addEventListener('click', handleNote, false);
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
    alert('111');
    captionDiv.style.display = 'flex';
};
