import {showCartNumber} from './common.js';

async function getArtworks(query) {
    let respJson;
    if (query == null || query === "" )  else {
        const resp = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}`);
        respJson = await resp.json();
    }

    let maxItems = respJson.total;
    if (maxItems > 100) 

    setSearchInfoFoundItems(respJson.total, query);

    for (let i = 0; i < maxItems; i++) {
        let artwork = await getArtworkById(respJson.objectIDs[i]);
        addArtworkToDOM(artwork);
    }
}

async function getArtworkById(id) {
    let cache = JSON.parse(localStorage.getItem('cache'));
    if (cache !== null) {
        const data = cache.find(obj => obj.objectID === id);
        if (data !== undefined) 

    }

    const resp = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
    const respJson = await resp.json();

    if (cache === null) 
    cache.unshift(respJson);
    localStorage.setItem('cache', JSON.stringify(cache));
    return respJson;
}


function addArtworkToDOM(artwork) {
    let gallery = document.getElementById("gallery");

    let artworkThumb = document.createElement("div");
    artworkThumb.className = "thumb";
    let artworkElement = document.createElement("a");
    artworkElement.id = artwork.objectID;
    artworkElement.href = `config.html?objectID=${artwork.objectID}`;
    let artworkImg = document.createElement("img");
    artworkImg.id = artwork.objectID + "-image";
    artworkImg.src = artwork.primaryImageSmall;
    let label = document.createElement("div");
    label.className = "museum-label";
    let artist = document.createElement("span");
    artist.className = "artist";
    artist.innerText = artwork.artistDisplayName;
    let title = document.createElement("span");
    title.className = "title";
    title.innerText = artwork.title;
    // append comma
    let date = document.createElement("span");
    date.className = "date";
    date.innerText = artwork.objectDate;


    label.appendChild(artist);
    label.appendChild(title);
    let commaText = document.createTextNode(', ');
    label.appendChild(commaText);
    label.appendChild(date);

    artworkElement.appendChild(artworkImg);
    artworkElement.appendChild(label);
    artworkThumb.appendChild(artworkElement);
    gallery.appendChild(artworkThumb);


}

function setSearchInfoFoundItems(itemAmount, searchValue) {
    const searchInfo = document.getElementById("search-info");
    if (searchValue == null || searchValue === "" )  else {
        if (itemAmount === 1)  else {
            searchInfo.innerText = `Found ${itemAmount} artworks for “${searchValue}”.`;
        }
    }

}

function setSearchInfo(searchValue) {
    const searchInfo = document.getElementById("search-info");
    searchInfo.innerText = `Searching for “${searchValue}”...`;
}


showCartNumber();

document.addEventListener('DOMContentLoaded', () => {
    const params = (new URL(document.location)).searchParams;
    const searchValue = params.get('q');

    setSearchInfo(searchValue);

    getArtworks(searchValue)
        .then()
        .catch();
});
