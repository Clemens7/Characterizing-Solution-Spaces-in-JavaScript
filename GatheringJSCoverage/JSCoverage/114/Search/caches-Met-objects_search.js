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

function addImageToGallery(frameLink, imageId, imgSource, artist, title, date) {
    var gallery = document.getElementById("gallery");

    var newThumb = document.createElement("div");
    newThumb.setAttribute("class", "thumb");

    var newA = document.createElement("a");
    newA.setAttribute("href", frameLink)
    newA.setAttribute("id", "object-" + imageId);

    var newImg = document.createElement("img");
    newImg.setAttribute("src", imgSource);
    newImg.setAttribute("alt", "");
    newImg.setAttribute("id", "object-image-" + imageId);

    var newLabel = document.createElement("div");
    newLabel.setAttribute("class", "museum-label");

    var newArtist = document.createElement("span");
    var newTitle = document.createElement("span");
    var newDate = document.createElement("span");
    newArtist.setAttribute("class", "artist");
    newTitle.setAttribute("class", "title");
    newDate.setAttribute("class", "date");
    newArtist.innerHTML = artist;
    newTitle.innerHTML = title + ", ";
    newDate.innerHTML = date;

    gallery.appendChild(newThumb);
    newThumb.appendChild(newA);
    newA.appendChild(newImg);
    newA.appendChild(newLabel);
    newLabel.appendChild(newArtist);
    newLabel.appendChild(newTitle);
    newLabel.appendChild(newDate);
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
    if (localStorage.getItem(imageId)) {
        console.log("fetching from localStorage: " + imageId);
        image = JSON.parse(localStorage.getItem(imageId));
        imageId = image.objectID;
        imgSource = image.primaryImageSmall;
        artist = image.artistDisplayName;
        title = image.title;
        date = image.objectDate;
        addImageToGallery(frameLink, imageId, imgSource, artist, title, date);
    }
}



