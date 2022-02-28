import {displayCartItems} from './util.js';

document.addEventListener('DOMContentLoaded', evt => {
    const params = (new URL(document.location)).searchParams;
    const query = params.get('q');
    if (!query)  else {
        const searchInfo = document.getElementById('search-info');
        searchInfo.innerText = `Searching for “${query}”...`;
        artworkSearch(query);
    }
});

const form = document.querySelector('main form');
form.addEventListener('submit', );

async function artworkSearch(searchTerm) {
    await retrieveObjectIDsAsync(searchTerm);}

export var Artworks = {
    serialize: ,
    parse: function (aw) {
        return aw.split(' ').join('+');
    }
};

async function retrieveObjectIDsAsync(searchterm) {
    const searchInfo = document.getElementById('search-info');
    const responseObjects = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?q=" + Artworks.parse(searchterm) + "&hasImages=true");

    const rawData = await responseObjects.json();
    if (rawData.total === 1)  else {
        searchInfo.innerText = `Found ${rawData.total} artworks for “${searchterm}”`;
    }
    await getObjetsAsync(rawData);}

async function getObjetsAsync(rawData) {

    let maxToShow = rawData.total > 100  : rawData.total;
    console.log(maxToShow);

    const results = await Promise.all(rawData.objectIDs.slice(0, maxToShow).map());}





export var ObjectsCache = {
    retrieve: ,
    store: 
};

displayCartItems();

class ArtWork {
    
}