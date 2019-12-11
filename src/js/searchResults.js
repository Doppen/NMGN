document.addEventListener("DOMContentLoaded", function(){
  var q = getUrlParameter('s');
  if (q != '') {
    var theContent = document.getElementById('theContent').innerHTML;
    const regex = new RegExp(q, 'g');
    theNewContent = theContent.replace(regex, '<span class="mgHighlight">'+q+'</span>');
    document.getElementById('theContent').innerHTML = theNewContent;
  }

    console.log(q);
});


function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
