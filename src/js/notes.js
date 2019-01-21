var classname = document.querySelectorAll(".noot");


var loca = document.getElementById("loca").getBoundingClientRect().left;
//alert(loca);


// put note in aside
var myFunction = function() {
    var attribute = this.querySelector("a").getAttribute("id");
    attribute = attribute.replace("-ref", "")
    noteContent = document.getElementById(attribute).innerHTML;
    document.getElementById("showNote").innerHTML= noteContent;
    //alert(this.offsetTop);

    if (window.matchMedia("(min-width: 1200px)").matches) {
      document.getElementById("showNote").style.top= this.getBoundingClientRect().top+window.pageYOffset-20+'px';
      document.getElementById("showNote").style.left= loca+30+'px';
    }


};

// remove anchor click
for (var i = 0; i < classname.length; i++) {
    classname[i].querySelector("a").removeAttribute('href');
    classname[i].addEventListener('click', myFunction, false);
}
