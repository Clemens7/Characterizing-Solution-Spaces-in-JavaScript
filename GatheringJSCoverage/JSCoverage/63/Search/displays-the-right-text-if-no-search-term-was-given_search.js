
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
    if(urlParams.has(SEARCH_PARAM))
    else{
        await getHighlights(highlights);}




async function getHighlights(highlightIds){
    let displayedItems = 0;
    for(let id of highlightIds){
        if(displayedItems >= 100)
        let item = await API.getItem(id);   
        if(item.primaryImageSmall && displayedItems < 100){
            displayItem(item);
            console.log("displayed item");
            displayedItems++;
        }
    }}


function displayItem(item){
    let root = document.getElementById("gallery");
    let itemRoot = document.createElement("div");
    itemRoot.classList.add("thumb");
    itemRoot.innerHTML = renderItem(item, item.objectId);
    root.appendChild(itemRoot);
}

function renderItem(item, id){
    return `
    <a href="config.html?objectID=${item.objectID}" id="object-${item.objectID}">
      <img src="${item.primaryImageSmall}" alt="${item.title}" id="object-image-${item.objectID}">
      <div class="museum-label">
        <span class="artist">${item.artistDisplayName}</span>
        <span class="title">${item.title}</span>,
        <span class="date">${item.objectDate}</span>
      </div>
    </a>`;
}



init();