
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
        await search(urlParams.get(SEARCH_PARAM));}

async function search(searchQuery){
    var t1 = performance.now()
    console.log("Search... (" + (t1-t0) + " milliseconds).");
    let searchField = document.getElementById("search-info");
    searchField.innerText = `Searching for “${searchQuery}”...`;
    const response = await fetch(SEARCH_API_URL.replace('{searchQuery}', searchQuery));}











init();