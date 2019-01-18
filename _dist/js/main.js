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
