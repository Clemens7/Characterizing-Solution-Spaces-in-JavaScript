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



async function loadArtworks(query){
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = '';

    if (query) 
    let objectIDs = await getObjectIDsFromQuery(query);
    if (query) 

    for (let objectID of objectIDs.slice(0,artworkLimit)) {
        // show artwork in gallery
        let artwork = await Cache.retrieve(objectID);}

async function getObjectIDsFromQuery(query){
    if (!query) {
        const highlights = await fetch('./highlights.json');
        const rawData = await highlights.json();
        return await rawData.highlights;
    }}






