import * as frame from './frame.js';

var MET_API_OBJECTS_ENDPOINT = "https://collectionapi.metmuseum.org/public/collection/v1/objects/"
var MET_API_SEARCH_ENDPOINT  = "https://collectionapi.metmuseum.org/public/collection/v1/search?q="

var highlights = {"highlights": [39799, 459055, 437853, 435809, 436535, 360018, 634108, 459080, 435882, 271890, 459054, 436105]};

window.onload = function onLoadFunction() {

    var params = (new URL(document.location)).searchParams;
    var q = params.get("q");
    if (q) {
        console.log(`q = ${q}`);
        search(q);
    }
	
	frame.updateItemAmount();
}




// Consider only objects where object.hasImages === true
function search(term) {
    var i = 0; // max of 100 objects shall be displayed
    var searchInfo = document.getElementById("search-info");
    
    searchInfo.innerHTML = `Searching for &ldquo;${term}&rdquo;...`;
    console.log("" + MET_API_SEARCH_ENDPOINT + term  + "&hasImages=true");
    fetch(MET_API_SEARCH_ENDPOINT + term  + "&hasImages=true")
        .then(res => res.json())
        .then((data) => {
            var count = data.total;
            var objectIDs = data.objectIDs;
            const singularInfo = `Found ${count} artwork for &ldquo;${term}&rdquo;`;
            const pluralInfo = `Found ${count} artworks for &ldquo;${term}&rdquo;`;

            if (objectIDs) {
                objectIDs.forEach(id => {
                    if (i < 100) {
                        fetchImage(id);
                        i++;
                    }
                });
                if (count == 1)  else {
                    searchInfo.innerHTML = pluralInfo;
                }
            }
        })
        .catch()
}



function fetchImage(imageId) {
    var frameLink = `config.html?objectID=${imageId}`;
    var imageId;
    var imgSource;
    var artist;
    var title;
	var hasImages;
    var date;
    var image;
    if (localStorage.getItem(imageId))  else {
        console.log("fetching from API: " + imageId);
        fetch(MET_API_OBJECTS_ENDPOINT + imageId)
            .then()
            .then()
        .catch();
    }
}



