var classname = document.querySelectorAll(".noot");

var myFunction = function() {
    var attribute = this.querySelector("span").getAttribute("id");
    attribute = attribute.replace("-backlink", "")
    noteContent = document.getElementById(attribute).innerHTML;
    document.getElementById("chapterIllustration").innerHTML= noteContent;


};

for (var i = 0; i < classname.length; i++) {
    classname[i].querySelector("a").removeAttribute('href');
    classname[i].addEventListener('click', myFunction, false);


}
