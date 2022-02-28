import { fetchJsonFromAPI } from './cache.js';
import { updateHeaderCartCount } from './cart.js'


const API = 'https://collectionapi.metmuseum.org/public/collection/v1';

const form = document.querySelector('main form');

document.addEventListener('DOMContentLoaded', event => {
    const params = (new URL(document.location)).searchParams;
    const queryParam = params.get('q');
    updateHeaderCartCount();
    if (!queryParam) {
        displayHighlights();
        return;
    }});

form.addEventListener('submit', );





async function displayHighlights() {
    const IDs = await fetch('./highlights.json').then(data => data.json().then(data => data.highlights));
    const artworks = await getArtworks(IDs);}



async function getArtworks(IDs) {
    return Promise.all(IDs.map(ID =>
        fetchJsonFromAPI(ID)
        .then()));
}




class Artwork {
    
}

