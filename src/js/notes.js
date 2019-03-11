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
