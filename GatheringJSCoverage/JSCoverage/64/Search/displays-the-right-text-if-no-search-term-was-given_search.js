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
        if (object)  else {
            batchRequestIds.push(objectId);
        }
    });
    const requestedArtworks = await batchFetchArtworks(batchRequestIds);}





async function batchFetchArtworks(objectIds) {
    return await Promise.all(objectIds.map(async id => {
        const objectRequest = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);}));
}

