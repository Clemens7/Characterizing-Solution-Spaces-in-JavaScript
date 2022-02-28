import { fetchJsonFromAPI } from './cache.js';
import { updateHeaderCartCount } from './cart.js'


const API = 'https://collectionapi.metmuseum.org/public/collection/v1';

const form = document.querySelector('main form');

document.addEventListener('DOMContentLoaded', event => {
    const params = (new URL(document.location)).searchParams;
    const queryParam = params.get('q');
    updateHeaderCartCount();
    if (!queryParam) 
    artworkSearch(queryParam);
});

form.addEventListener('submit', );


async function artworkSearch(query) {
    const searchInfo = document.querySelector("#search-info");
    searchInfo.innerText = `Searching for “${query}”...`;
    const IDs = await retrieveArtworkIDs(query);
    const artworks = await getArtworks(IDs);
    searchInfo.innerText = `Found ${artworks.length} artwork${(artworks.length == 1)  : 's'} for “${query}”`;
    for(let artwork of artworks) 
}




async function retrieveArtworkIDs(query) {
    const searchResponse = await fetch(`${API}/search?hasImages=true&q=${query}`);
    const rawData = await searchResponse.json();
    if (rawData.total == 0) {
        return [];
    }}

async function getArtworks(IDs) {
    return Promise.all(IDs.map());
}




class Artwork {
    
}

