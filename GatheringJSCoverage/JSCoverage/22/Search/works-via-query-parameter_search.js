import {Artwork, ArtworkContainer} from './artwork.js';
import { refreshNumberOfCartItems } from './shopping_cart.js';
import {retrieveArtworkInformation} from "./museum-endpoint.js";

//retrieve number of artworks and their ids which were found during the Met API search
async function retrieveObjectIDs(query) {
    const url = apiSearchUrl(query);
    try {
        const response = await fetch(url);
        const rawData = await response.json();
        console.log(JSON.stringify(rawData));
        return rawData;

    }}

function apiSearchUrl(query) {
    return `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}`;
}

//search via Met API and display found artworks
async function imageSearch(query) {
    let searchtext = document.getElementById('search-info');
    searchtext.innerText = `Searching for “${query}”...`;
    const img = await retrieveObjectIDs(query);
    let text = document.getElementById('search-info');
    text.innerText = `Found ${img.total} artwork${img.total === 1  : 's'} for “${query}”`;
    if (!img || img.total === 0) 
    await showArtworks(img.objectIDs, 100);
}

//retrieve information for a single artwork and add it to html
async function showArtworks(objectIDs, maxArtworks = undefined) {
    const artworkContainer = new ArtworkContainer();
    artworkContainer.clear();
    if (maxArtworks === undefined
        || typeof(maxArtworks) !== 'number'
        || maxArtworks > objectIDs.length) {
        maxArtworks = objectIDs.length;
    }
    for (let i = 0; i < maxArtworks; i++) {
        let artwork = await retrieveArtworkInformation(objectIDs[i]);
        artworkContainer.createArtworkContainer(artwork);
    }
}

//show fixed number of highlights when no query param is given


//clean params due to 'incorrect' test cases
function cleanQueryParam(query) {
    return query.replace(/\+/g, ' ');
}


//on page load display artworks
window.onload = function () {
    //show new search results when using search form
    const form = document.querySelector('#search-form');
    form.addEventListener('submit', );

    refreshNumberOfCartItems();
    let param = new URLSearchParams(document.location.search).get("q");
    if (!param)  else {
        param = cleanQueryParam(param);
        imageSearch(param);
    }
};