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
        .then(dataObjects => addSearchItems(gallery, template, dataObjects));
}

function addSearchItems(parent, template, dataObjects) {
    console.log(dataObjects);
    dataObjects.forEach(dataObject => {
        addSearchItem(parent, template, dataObject); 
    });
}

function addSearchItem(parent, template, dataObject) {
    let clone = template.cloneNode(true);
    clone.querySelector('.artist').textContent = dataObject["artistDisplayName"];
    clone.querySelector('.title').textContent = dataObject["title"];
    clone.querySelector('.date').textContent = dataObject["objectDate"];
    
    let image = clone.querySelector("img");
    image.src = dataObject["primaryImageSmall"];

    let anchor = clone.querySelector("a");
    anchor.href = "./config.html?objectID=" + dataObject["objectID"];

    gallery.appendChild(clone);
}
