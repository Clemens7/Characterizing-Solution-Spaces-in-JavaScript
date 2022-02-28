import {Artwork, ArtworkContainer} from './artwork.js';
import { refreshNumberOfCartItems } from './shopping_cart.js';
import {retrieveArtworkInformation} from "./museum-endpoint.js";

//retrieve number of artworks and their ids which were found during the Met API search
async function retrieveObjectIDs(query) {
    const url = apiSearchUrl(query);
    try {
        const response = await fetch(url);}

function apiSearchUrl(query) {
    return `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}`;
}

//search via Met API and display found artworks
async function imageSearch(query) {
    let searchtext = document.getElementById('search-info');
    searchtext.innerText = `Searching for “${query}”...`;
    const img = await retrieveObjectIDs(query);} for “${query}”`;
    if (!img ) }

//retrieve information for a single artwork and add it to html


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