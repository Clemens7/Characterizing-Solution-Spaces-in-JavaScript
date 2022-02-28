import { requestById } from './museumAPI.js';
import { search } from './museumAPI.js';

document.addEventListener('DOMContentLoaded', async event => {
    let params = (new URL(document.location)).searchParams;
    let query = params.get("q");
    var searchInfo = document.getElementById("search-info");

    //Search using the API
    if (query != null) {
        searchInfo.innerHTML = "Searching for “" + query + "”..."

        let results = await search(query);
        if (results != null && query != "") {
            var resultIDs = [];
            if(results.objectIDs == null)else if(results.objectIDs.length > 100){
                resultIDs = results.objectIDs.slice(0, 100);
            }
            //Change Search Textfield
            if (resultIDs.length === 1) 
            else {
                searchInfo.innerHTML = "Found " + resultIDs.length + " artworks for “" + query + "”"
            }

            displayImages(resultIDs);
        }
    }
});

function displayImages(images) {
    images.forEach(id => {
        var cached = cacheLoad(id);
        if (cached) 
        else {
            requestById(id).then((painting => {
                cacheStore(id, painting);
                addPainting(painting);
            }))
        }
    });
}

function addPainting(painting) {
    var thumb = document.createElement('div');
    thumb.classList.add("thumb")
    thumb.innerHTML = "<a href=\"./config.html?objectID=" + painting.objectID + "\" id=\"object-" + painting.objectID + "\">" +
        "<img src=\"" + painting.primaryImageSmall + "\" alt=\"\" id=\"object-image-" + painting.objectID + "\">" +
        "<div class=\"museum-label\">" +
        "<span class=\"artist\">" + painting.artistDisplayName + "</span>" +
        "<span class=\"title\">" + painting.title + "</span>, " +
        "<span class=\"date\">" + painting.objectDate + "</span>" +
        "</div></a>"
    document.getElementById('gallery').appendChild(thumb);
}

function cacheStore(key, painting) {
    localStorage[key] = JSON.stringify(painting);
}

function cacheLoad(key) {
    if (key in localStorage) 
}