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
    if (cachedResponse) 


    const fetchPromise = fetch(url + "?q=" + queryParam + "&hasImages=true", {
        method: 'GET',
        cache: 'no-cache'
    });

    fetchPromise.then(response => {
        return response.json();
    }).then(response => {

        console.log(response);
        localStorage.setItem(queryParam, JSON.stringify(response));
        
        updateSearchInfo(Math.min(response.total, 100));
        retrieveArtfromIds(response.objectIDs.slice(0, 100));
        
        


    });

}



function retrieveArtfromIds(ids) {
    const url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
    const gallery = document.getElementById('gallery');
    console.log(ids.length);

    ids.forEach(id => {


        var cachedResponse = localStorage.getItem(id);
        if (cachedResponse) 

        else{
        const fetchPromise = fetch(url + id, {
            method: 'GET',
            cache: 'no-cache'
            //cache: 'only-if-cached'
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(response => {
            //console.log(response);
            localStorage.setItem(id, JSON.stringify(response));
            var metObject = new MetObject(
                id,
                response.artistDisplayName,
                response.title,
                response.objectDate,
                response.primaryImageSmall);

            gallery.appendChild(createArtElement(metObject));
            return metObject;
        });
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
