// get all headers 2 and 3.
var elems = document.querySelectorAll('h2, h3');
//console.log(elems);

// adb anchor link to each header
for (var i = 0; i < elems.length; i++) {
    //var hId = elems[i].getAttribute( 'id' );
    var hId = elems[i].innerHTML.replace(/ /g,"_");
    hId = hId.replace('<span_class="Bold">','');
    hId = hId.replace('</span>','');
    console.log(hId);
    document.body.innerHTML = document.body.innerHTML.replace('<h2>', '<a id="l'+hId+'"></a><h2 id="'+hId+'" >');
    //document.body.innerHTML = document.body.innerHTML.replace('<h3>', '<a id="l'+hId+'"></a><h3 id="'+hId+'" >');
}


// Generate a navigation list
var headerNavigation = '';
var linkClass = '';
for (var i = 0; i < elems.length; i++) {
    linkClass = '';
    var hId = elems[i]//.innerHTML //.replace(/ /g,"_");

    var hIdSup = hId.querySelector('span');
    if (hIdSup !== null) {
      hId.removeChild(hIdSup);
    }

    hId = hId.innerHTML.replace(/ /g,"_");

    hId = hId.replace('<span_class="Bold">','');
    hId = hId.replace('</span>','');
    var hTxt = elems[i].innerText;


    var hTag = elems[i].tagName;

    headerNavigation = headerNavigation+'<a href="#l'+hId+'" class="'+linkClass+'">'+hTxt+'</a>';
}

document.getElementById("subNavigation").innerHTML = headerNavigation;
