import * as ArtworkCache from './artwork-cache.js';
import {displayCartContent} from "./cart-common.js";

const onLoaded = () => {
    const query = (new URL(document.location)).searchParams.get('q');
    displayCartContent();
    if (query)  else {
        loadHighlights();
    }
};

document.addEventListener('DOMContentLoaded', onLoaded);



async function loadHighlights() {
    const response = await fetch('highlights.json');
    const objectIds = (await response.json()).highlights;
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
    insertResultsIntoDOM(artworks);
}

function insertResultsIntoDOM(results) {
    const resultsContainer = document.querySelector('#gallery');
    resultsContainer.innerHtml = '';
    // resultsContainer.append(...results.map(r => createArtworkElement(r)));
    results.map(r => createArtworkElement(r)).forEach(e => resultsContainer.appendChild(e));
}



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