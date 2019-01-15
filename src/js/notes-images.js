var classname = document.querySelectorAll(".noot");

var myFunction = function() {
    var attribute = this.querySelector("span").getAttribute("id");
    attribute = attribute.replace("-backlink", "")
    noteContent = document.getElementById(attribute).innerHTML;
    document.getElementById("showNote").innerHTML= noteContent;
    //alert(this.offsetTop);
    document.getElementById("showNote").style.top= this.offsetTop;


};

for (var i = 0; i < classname.length; i++) {
    classname[i].querySelector("a").removeAttribute('href');
    classname[i].addEventListener('click', myFunction, false);


}
