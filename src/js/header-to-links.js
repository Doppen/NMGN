// get all headers 2 and 3.
var elems = document.querySelectorAll('h2');
//console.log(elems);

// adb anchor link to each header
for (var i = 0; i < elems.length; i++) {
    //var hId = elems[i].getAttribute( 'id' );
    var hId = elems[i].innerHTML.replace(/ /g,"_");
    //replace(/ /g,"_");
    document.body.innerHTML = document.body.innerHTML.replace('<h2>', '<a id="l'+hId+'"></a><h2 id="'+hId+'" >');
}


// Generate a navigation list
var headerNavigation = '';
var linkClass = '';
for (var i = 0; i < elems.length; i++) {
    linkClass = '';
    var hId = elems[i].getAttribute( 'id' );
    var hTxt = elems[i].innerText;
    var hTag = elems[i].tagName;

    headerNavigation = headerNavigation+'<a href="#l'+hId+'" class="'+linkClass+'">'+hTxt+'</a><br>';
}

document.getElementById("subNavigation").innerHTML = headerNavigation;
