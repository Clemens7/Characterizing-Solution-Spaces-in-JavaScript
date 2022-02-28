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
        const response = await fetch(url);;
    }}

async function loadArtworks(query){
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = '';

    if (query) {
        searchInfo.innerText = `Searching for “${SearchParser.parse(query)}”...`;
    }
    let objectIDs = await getObjectIDsFromQuery(query);}

async function getObjectIDsFromQuery(query){
    if (!query)  else {
        searchInfo.innerText = `Searching for “${query}”...`;
        const result = await retrieveArtworks(query);}





function api_search(query) {
    return `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}`;
}
