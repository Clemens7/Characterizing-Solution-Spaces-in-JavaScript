const metApiBaseURL = "https://collectionapi.metmuseum.org/public/collection/v1";

function createGalleryItem(metapiObject) {
    let element = document.getElementById('gallery');
    element.innerHTML += `
        <div class="thumb">
            <a href="config.html?objectID=${metapiObject.objectID}" id="object-${metapiObject.objectID}">
                <img src="${metapiObject.primaryImageSmall}" alt="" id="object-image-${metapiObject.objectID}">
                <div class="museum-label">
                    <span class="artist">${metapiObject.artistDisplayName}</span>
                    <span class="title">${metapiObject.title}</span>,
                    <span class="date">${metapiObject.objectDate}</span>
                </div>
            </a>
        </div>
        `;
}

function metApiSearchForObjectID(objectID) {
    let localStorageQuery = localStorage.getItem(`object-${objectID}`);

    if (localStorageQuery == null) {
        fetch(`${metApiBaseURL}/objects/${objectID}`)
            .then(response => response.json())
            .then(json =>  {
                localStorage.setItem(`object-${objectID}`, JSON.stringify(json));
                return json;
            })
            .then(json => createGalleryItem(json))
            .catch();

    }
}


function setSearchInfoString(searchResponse) {
    if (searchTerm == null) 

    let total = searchResponse.total;
    let artworksString;
    if (total == 1)  else {
        artworksString = "artworks";
    }

    document.getElementById('search-info').innerHTML = `Found ${total} ${artworksString} for “${searchTerm}”`;
}

async function metApiSearchForTerm(q) {
    let objectIDs;
    if (searchTerm != null) {
        let searchInfo = document.getElementById('search-info');
        searchInfo.innerHTML = `Searching for “${searchTerm}”...`;

        let requestURL = `${metApiBaseURL}/search?q=${q}&hasImages=true`;

        objectIDs = fetch(requestURL)
            .then(response => response.json()) 
            .then(json => {
                setSearchInfoString(json);
                return json;
            })
            .then(json => json.objectIDs);

    }

    objectIDs
        .then(objectIDs => objectIDs.slice(0, 100))
        .then(objectIDs => {
            objectIDs.map(id => {
                metApiSearchForObjectID(id);
            })
        })
        .catch();
}

setCartNumber();
let urlParams = new URLSearchParams(window.location.search);
let searchTerm = urlParams.get('q');

metApiSearchForTerm(searchTerm);
