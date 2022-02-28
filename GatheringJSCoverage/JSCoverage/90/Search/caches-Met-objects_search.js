import {addToCache, getCache} from "./cartStorage.js";

let formId = document.getElementById('search-form');


document.addEventListener('DOMContentLoaded', event => {
    const params = (new URL(document.location)).searchParams;
    var searchQuery = params.get('q');
    const currentlyDisplaying = document.getElementById('gallery');
    currentlyDisplaying.innerHTML = '';
    if (!searchQuery || searchQuery === "") 
    document.getElementById('search').value = searchQuery;
    respondToSearchRequest(searchQuery);
});

formId.addEventListener('submit', );

function respondToSearchRequest(searchQuery) {
    if (searchQuery === "")  else {
        document.getElementById('search-info').innerText = `Searching for “${searchQuery}”...`;
        var parsedSearchTerm = searchQuery.split(' ').join('+');
        const inLocalStorage = checkLocalStorage(parsedSearchTerm);
        if (!inLocalStorage) 
    }
}



function getFromLocalStorage(searchTerm) {
    const storageData = localStorage.getItem(searchTerm);
    if (storageData === "" || storageData === "[null]") 
    return JSON.parse(storageData);
}

function checkLocalStorage(searchTerm) {
    const localStorageData = getFromLocalStorage(searchTerm);
    if (!Array.isArray(localStorageData))  else {
        for (let dataItem of localStorageData) {
            addGalleryItem(dataItem);
        }
        if (searchTerm !== "NoSearchTerm") {
            displaySearchResultInfo(localStorageData.length, searchTerm);
        }
        return true;
    }
}






function displaySearchResultInfo(number, searchTerm) {
    const parsedSearchTerm = searchTerm.split('+').join(' ');
    if (number == 1)  else {
        document.getElementById("search-info").innerText = `Found ${number} artworks for “${parsedSearchTerm}”`;
    }
}





function addGalleryItem(artwork) {
    const result = document.getElementById('gallery');
    if (artwork.primaryImageSmall) {
        result.appendChild(createGalleryItem(artwork));
    }
}







function createGalleryItem(galleryItem) {

    const gallery = document.createElement('galleryItem');
    const objectID = galleryItem.objectID;
    const imageURL = galleryItem.primaryImageSmall;
    const imageTitle = galleryItem.title;
    const artistName = galleryItem.artistDisplayName;
    const objectDate = galleryItem.objectDate;
    const linkFrameConfig = `config.html?objectID=${objectID}`;

    const thumbDiv = document.createElement('div');
    thumbDiv.setAttribute("class", "thumb");

    gallery.appendChild(thumbDiv);

    const linkConfigA = document.createElement('a');
    linkConfigA.href = linkFrameConfig;
    linkConfigA.id = "object-0";

    thumbDiv.appendChild(linkConfigA);

    const imageImg = document.createElement('img');
    imageImg.alt = imageTitle;
    imageImg.src = imageURL;
    imageImg.id = "object-image-0";

    linkConfigA.appendChild(imageImg);

    const museumLabelDiv = document.createElement('div');
    museumLabelDiv.setAttribute("class", "museum-label");

    linkConfigA.appendChild(museumLabelDiv);

    const artistSpan = document.createElement('span');
    artistSpan.setAttribute("class", "artist");
    artistSpan.innerText = artistName;

    museumLabelDiv.appendChild(artistSpan);

    const titleSpan = document.createElement('span');
    titleSpan.setAttribute("class", "title");
    titleSpan.innerText = imageTitle + ", ";

    museumLabelDiv.appendChild(titleSpan);

    const objectDateSpan = document.createElement('span');
    objectDateSpan.setAttribute("class", "date");
    objectDateSpan.innerText = objectDate;

    museumLabelDiv.appendChild(objectDateSpan);

    return gallery;
}