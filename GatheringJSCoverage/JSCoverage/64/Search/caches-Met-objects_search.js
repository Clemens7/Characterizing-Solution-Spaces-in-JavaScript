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
    results.map(r => createArtworkElement(r)).forEach(e => resultsContainer.appendChild(e));
}

async function queryArtworks(query) {
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}&hasImages=true`);
    const responseJson = await response.json();
    if (responseJson.total > 0) {
        const objectIds = responseJson.objectIDs.slice(0, 100);
        const artworks = [];
        const batchRequestIds = [];
        objectIds.forEach(objectId => {
            const object = ArtworkCache.retrieve(objectId);
            if (object) {
                artworks.push(object);
            }
        });
        const requestedArtworks = await batchFetchArtworks(batchRequestIds);
        requestedArtworks.forEach();
        artworks.push(...requestedArtworks);
        return artworks;
    }}

async function batchFetchArtworks(objectIds) {
    return await Promise.all(objectIds.map());
}

function createArtworkElement(artwork) {
    const artistSpan = document.createElement('span');
    artistSpan.classList.add('artist');
    artistSpan.innerText = artwork.artistDisplayName;
    const titleSpan = document.createElement('span');
    titleSpan.classList.add('title');
    titleSpan.innerText = artwork.title;
    const dateSpan = document.createElement('span');
    dateSpan.classList.add('date');
    dateSpan.innerText = artwork.objectDate;
    const museumLabelContainer = document.createElement('div');
    museumLabelContainer.classList.add('museum-label');
    museumLabelContainer.append(artistSpan, titleSpan, ', ', dateSpan);
    const image = document.createElement('img');
    image.src = artwork.primaryImageSmall;
    const link = document.createElement('a');
    link.href = `config.html?objectID=${artwork.objectID}`;
    link.append(image, museumLabelContainer);
    const artworkElement = document.createElement('div');
    artworkElement.classList.add('thumb');
    artworkElement.appendChild(link);
    return artworkElement;
}