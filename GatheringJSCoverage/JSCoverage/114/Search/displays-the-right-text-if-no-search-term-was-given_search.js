import * as frame from './frame.js';

var MET_API_OBJECTS_ENDPOINT = "https://collectionapi.metmuseum.org/public/collection/v1/objects/"
var MET_API_SEARCH_ENDPOINT  = "https://collectionapi.metmuseum.org/public/collection/v1/search?q="

var highlights = {"highlights": [39799, 459055, 437853, 435809, 436535, 360018, 634108, 459080, 435882, 271890, 459054, 436105]};

window.onload = function onLoadFunction() {

    var params = (new URL(document.location)).searchParams;
    var q = params.get("q");
    if (q)  else {
        loadHighlights();
        console.log(highlights.highlights);
    }
	
	frame.updateItemAmount();
}


function loadHighlights() {
    highlights.highlights.forEach(id => {
        fetchImage(id);
    });
}

// Consider only objects where object.hasImages === true


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
    if (localStorage.getItem(imageId))  else {
        console.log("fetching from API: " + imageId);
        fetch(MET_API_OBJECTS_ENDPOINT + imageId)
            .then(res => res.json())
            .then((data) => {
                imageId = data.objectID;
                imgSource = data.primaryImageSmall; 
                artist = data.artistDisplayName;
                title = data.title;
                date = data.objectDate;
                hasImages = data.hasImages;
                addImageToLocalStorage(data);
                addImageToGallery(frameLink, imageId, imgSource, artist, title, date);
        })
        .catch();
    }
}



function addImageToLocalStorage(image) {
    console.log(`adding image with id ${image.objectID} to localStorage`);
    localStorage.setItem(JSON.stringify(image.objectID), JSON.stringify(image));
}