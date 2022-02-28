import {Artwork, ArtworkContainer} from './artwork.js';
import { refreshNumberOfCartItems } from './shopping_cart.js';
import {retrieveArtworkInformation} from "./museum-endpoint.js";

//retrieve number of artworks and their ids which were found during the Met API search




//search via Met API and display found artworks


//retrieve information for a single artwork and add it to html
async function showArtworks(objectIDs, maxArtworks = undefined) {
    const artworkContainer = new ArtworkContainer();
    artworkContainer.clear();
    if (maxArtworks === undefined
        
        ) {
        maxArtworks = objectIDs.length;
    }
    for (let i = 0; i < maxArtworks; i++) {
        let artwork = await retrieveArtworkInformation(objectIDs[i]);
        artworkContainer.createArtworkContainer(artwork);
    }
}

//show fixed number of highlights when no query param is given
async function retrieveHighlights() {
    try {
        let highlightIDs = await fetch('highlights.json')
            .then(response => response.json());
        await showArtworks(highlightIDs.highlights);
    } 
}

//clean params due to 'incorrect' test cases



//on page load display artworks
window.onload = function () {
    //show new search results when using search form
    const form = document.querySelector('#search-form');
    form.addEventListener('submit', );

    refreshNumberOfCartItems();
    let param = new URLSearchParams(document.location.search).get("q");
    if (!param) {
        retrieveHighlights();
    }
};