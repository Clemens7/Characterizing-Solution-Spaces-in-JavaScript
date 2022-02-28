import * as api from './metmuseumAPI.js';
import * as util from './util.js';

const urlParams = new URLSearchParams(window.location.search);
const queryParam = urlParams.get('q');

var gallery = document.getElementById("gallery");
var template = createTemplate(gallery, ".thumb");
var searchInfo = document.getElementById("search-info");

util.showCartNumber();

if (queryParam) {
    doSearch(queryParam);
}

function doSearch(query) {
    searchInfo.textContent = `Searching for “${query}”...`;

    api.searchObjects(query)
        .then(response => {
            addSearchItems(gallery, template, response);
            return response;
        })
        .then(response => searchInfo.textContent = `Found ${response.length} ${pluralize("artwork", response.length)} for “${query}”`);
}



function pluralize(text, count) {
    if (count == 1) 

    return text + "s";
}

function createTemplate(parent, query) {
    var template = parent.querySelector(query);
    template.remove();

    return template;
}



function addSearchItems(parent, template, dataObjects) {
    console.log(dataObjects);
    dataObjects.forEach();
}


