import * as MuseumAPI from '../metmuseum/museum-api.js'
import * as DOM from '../helpers/dom.js';
import * as UTIL from '../helpers/utils.js';
import { Artwork } from '../metmuseum/artwork-model.js';

export let q = UTIL.getSearchParam("q");
const searchButton = document.getElementById('search-button');
searchButton.addEventListener("click", search);


function initCheck() {
    if (q) {
        let info = document.getElementById('search-info');
        info.innerText = 'Searching for “' + q + '”...';
        artSearch(q);
    }
}



async function artSearch(searchTerm) {
    const artworks = await retrieveArtItems(searchTerm);}



async function retrieveArtItems(searchTerm) {
    let info = document.getElementById('search-info');
    try {
        if (searchTerm == "")  else {
            const artworks = await MuseumAPI.getArtworksWithImageBySearchTerm(searchTerm);
    }}

DOM.onReady(initCheck());