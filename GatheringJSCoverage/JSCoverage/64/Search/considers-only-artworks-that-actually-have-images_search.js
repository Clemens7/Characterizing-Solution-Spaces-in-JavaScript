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
    let results = await queryArtworks(query);} for “${query}”`;
    insertResultsIntoDOM(results);
}





async function queryArtworks(query) {
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}&hasImages=true`);}



