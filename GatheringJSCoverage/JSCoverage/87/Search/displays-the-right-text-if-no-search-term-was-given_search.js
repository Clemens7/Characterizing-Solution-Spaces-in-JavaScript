import * as api from './metmuseumAPI.js';
import * as util from './util.js';

const urlParams = new URLSearchParams(window.location.search);
const queryParam = urlParams.get('q');

var gallery = document.getElementById("gallery");
var template = createTemplate(gallery, ".thumb");
var searchInfo = document.getElementById("search-info");

util.showCartNumber();

if (queryParam) 
else {
    doHighlights();
}



function doHighlights() {
    fetch("./highlights.json")
       .then(response => response.json())
       .then(data => show(data["highlights"]));
}



function createTemplate(parent, query) {
    var template = parent.querySelector(query);
    template.remove();

    return template;
}

function show(ids) {
    api.getObjects(ids)
        .then();
}




