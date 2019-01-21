var classname = document.querySelectorAll(".inlineImage");

// remove put note in aside
var changeImage = function() {
    var attribute = this.getAttribute("id");
    noteContent = document.getElementById(attribute).innerHTML;
    document.getElementById("chapterIllustration").innerHTML= noteContent;



};

// remove anchor click
for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', changeImage, false);
}
