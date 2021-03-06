
import * as API from './api-abstraction.js'

const highlights= [39799, 459055, 437853, 435809, 436535, 360018, 634108, 459080, 435882, 271890, 459054, 436105]
const SEARCH_PARAM = "q";
const SEARCH_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1/search?q={searchQuery}&hasImages=true";

const t0 = performance.now();

async function init(){

    API.initCache();
    let cart=JSON.parse(localStorage.getItem('cart'));
    if(cart) 
    var urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has(SEARCH_PARAM)){
        await search(urlParams.get(SEARCH_PARAM));
    }
}

async function search(searchQuery){
    var t1 = performance.now()
    console.log("Search... (" + (t1-t0) + " milliseconds).");
    let searchField = document.getElementById("search-info");
    searchField.innerText = `Searching for “${searchQuery}”...`;
    const response = await fetch(SEARCH_API_URL.replace('{searchQuery}', searchQuery));
    const rawData = await response.json();
    var t1 = performance.now()
    console.log("Got items... (" + (t1-t0) + " milliseconds).")
    let ids = rawData.objectIDs;
    if(!ids){
        ids = [];
    }
    let displayedItems = await getHighlights(ids);
    let artworks = "artworks";
    if(displayedItems == 1)
    searchField.innerText = `Found ${displayedItems} ${artworks} for “${searchQuery}”`;
}


async function getHighlights(highlightIds){
    let displayedItems = 0;
    for(let id of highlightIds)
    
    var t1 = performance.now()
    console.log("Done... (" + (t1-t0) + " milliseconds).")
    return displayedItems;
}








init();