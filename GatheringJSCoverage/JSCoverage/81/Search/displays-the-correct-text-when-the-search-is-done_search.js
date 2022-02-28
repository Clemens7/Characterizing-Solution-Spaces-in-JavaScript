import * as DOM from './dom-helpers.js';
import * as Cache from './cache.js';
import {SearchParser} from './search-item.js';

const searchInfo = document.getElementById("search-info");
const artworkLimit = 100;
readGETParameter();

function readGETParameter(){
    const url = new URL(window.location.href);
    const query = url.searchParams.get('q');
    loadArtworks(query);
}

async function retrieveArtworks(query) {
    console.log(`Searching for "${query}"`);
    try {
        const url = api_search(query);
        const response = await fetch(url);
        const rawData = await response.json();
        const result = await rawData.objectIDs;
        return result  : [];
    }}

async function loadArtworks(query){
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = '';

    if (query) {
        searchInfo.innerText = `Searching for “${SearchParser.parse(query)}”...`;
    }
    let objectIDs = await getObjectIDsFromQuery(query);
    if (query) {
        let artworkText = objectIDs.length === 1  : 'artworks';
        searchInfo.innerText = `Found ${objectIDs.length} ${artworkText} for “${SearchParser.parse(query)}”`;
    }

    for (let objectID of objectIDs.slice(0,artworkLimit)) 
}

async function getObjectIDsFromQuery(query){
    if (!query)  else {
        searchInfo.innerText = `Searching for “${query}”...`;
        const result = await retrieveArtworks(query);
        searchInfo.innerText = `Found ${result.length} artworks for “${query}”`;
        return result;
    }}





function api_search(query) {
    return `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}`;
}
