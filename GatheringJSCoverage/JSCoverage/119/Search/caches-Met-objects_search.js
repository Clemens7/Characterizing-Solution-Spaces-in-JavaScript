class MetObject {
    constructor(objectID, artist, title, date, thumbnail) {
        this.objectID = objectID;
        this.artist = artist;
        this.title = title;
        this.date = date;
        this.thumbnail = thumbnail;
    }
}


urlParams = new URLSearchParams(window.location.search);
queryParam = urlParams.get("q");


var artCount;
var metObjectIds;
var metObjects


if (queryParam != null) {
    document.addEventListener('DOMContentLoaded', event => {
        const h2 = document.getElementById('search-info');
        h2.innerHTML = `Searching for “${queryParam}”...`;
    });
    searchArt();
}



async function searchArt() {

    const url = "https://collectionapi.metmuseum.org/public/collection/v1/search";

    var cachedResponse = localStorage.getItem(queryParam);
    if (cachedResponse) {
        console.log("Cache Hit");
        cachedResponse = JSON.parse(cachedResponse);
        console.log(cachedResponse.total);


        document.addEventListener('DOMContentLoaded', event => {
            updateSearchInfo(Math.min(cachedResponse.total, 100));
            retrieveArtfromIds(cachedResponse.objectIDs.slice(0, 100));
            
        });
        return;
    }}



function retrieveArtfromIds(ids) {
    const url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
    const gallery = document.getElementById('gallery');
    console.log(ids.length);

    ids.forEach(id => {


        var cachedResponse = localStorage.getItem(id);
        if (cachedResponse) {
            console.log("Cache Hit");
            cachedResponse = JSON.parse(cachedResponse);
            
            
                var metObject = new MetObject(
                    id,
                    cachedResponse.artistDisplayName,
                    cachedResponse.title,
                    cachedResponse.objectDate,
                    cachedResponse.primaryImageSmall);
    
                gallery.appendChild(createArtElement(metObject));
                return metObject;
            
            
        }
    });



}

function createArtElement(metObject) {
    const div = document.createElement('div');
    div.className = "thumb";
    div.id = "demo";
    div.innerHTML =
        `<a href="config.html?objectID=${metObject.objectID}" id="object-0">
        <img src="${metObject.thumbnail}" alt="" id="object-image-0">
        <div class="museum-label">
            <span class="artist">${metObject.artist}</span>
            <span class="title">${metObject.title}</span>,
            <span class="date">${metObject.date}</span>
        </div>
        </a>`;

    return div;
}

function updateSearchInfo(totalCount) {



    const h2 = document.getElementById('search-info');

    var artwork;
    if (totalCount == 1) 
    else {
        artwork = "artworks";
    }

    h2.innerHTML = `Found ${totalCount} ${artwork} for “${queryParam}”`;


}
