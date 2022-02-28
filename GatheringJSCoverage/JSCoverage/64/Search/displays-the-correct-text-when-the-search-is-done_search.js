import * as ArtworkCache from './artwork-cache.js';
import {displayCartContent} from "./cart-common.js";

const onLoaded = () => {
    const query = (new URL(document.location)).searchParams.get('q');
    displayCartContent();
    if (query) {
        document.querySelector('#search').value = query;
        submitSearch(query);
    }
};

document.addEventListener('DOMContentLoaded', onLoaded);

async function submitSearch(query) {
    const searchInfo = document.querySelector('#search-info');
    searchInfo.innerText = `Searching for “${query}”...`;
    let results = await queryArtworks(query);
    searchInfo.innerText = `Found ${results.length} artwork${results.length !== 1 ? 's' } for “${query}”`;
    insertResultsIntoDOM(results);
}



function insertResultsIntoDOM(results) {
    const resultsContainer = document.querySelector('#gallery');
    resultsContainer.innerHtml = '';
    // resultsContainer.append(...results.map(r => createArtworkElement(r)));
    results.map().forEach();
}

async function queryArtworks(query) {
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}&hasImages=true`);
    const responseJson = await response.json();
    if (responseJson.total > 0) 
    return [];
}



