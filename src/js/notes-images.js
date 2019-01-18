var classname = document.querySelectorAll(".noot");

// remove put note in aside
var myFunction = function() {
    var attribute = this.querySelector("a").getAttribute("id");
    attribute = attribute.replace("-ref", "")
    noteContent = document.getElementById(attribute).innerHTML;
    document.getElementById("showNote").innerHTML= noteContent;
    //alert(this.offsetTop);
    document.getElementById("showNote").style.top= this.offsetTop;


};

// remove anchor click
for (var i = 0; i < classname.length; i++) {
    classname[i].querySelector("a").removeAttribute('href');
    classname[i].addEventListener('click', myFunction, false);
}
