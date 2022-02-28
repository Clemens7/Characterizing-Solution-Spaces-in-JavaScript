import { Artwork } from "./artwork.js";
import * as ArtworkCache from "./artwork-cache.js";

const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1/";
const HIGHLIGHTS_SRC = "./highlights.json";

// Automatically converts "+" to " " (for test cases)
const SEARCH_BOX = document.getElementById("search");
SEARCH_BOX.addEventListener('input', )

// Checks if there is a query parameter in the URL and conducts a search
document.addEventListener('DOMContentLoaded', event => {
    if ((window.location.href).includes("?q="))  else {
        showHiglights();
    }
});

/**
 * Shows highlights
 */
async function showHiglights() {
    fetch(HIGHLIGHTS_SRC)
        .then(response => response.json())
        .then((highlights) => {
            console.log(highlights.highlights);
            fetchAndShowArtworks(highlights.highlights);
        });
}

/**
 * Conducts a search by taking a searchString
 * @param {String} searchString the string to search for
 */
export 

/**
 * Fetch and show artworks
 * @param {array} objectIDs the objectIDs to fetch and show
 */
async function fetchAndShowArtworks(objectIDs) {
    for (const ID of objectIDs) {
        fetchArtwork(ID)
            .then().catch();
    }
}

/**
 * Fetches an artwork with a specific id
 * @param {number} artworkID
 * @returns {Artwork} an artwork object containing only relevant information (for the search-page at least)
 */
async function fetchArtwork(artworkID) {
    return new Promise((resolve, reject) => {
        let artwork = ArtworkCache.retrieve(artworkID);
        if (artwork)  else {
            fetch(BASE_URL + "objects/" + artworkID)
                .then()
                .then()
                .catch();
        }
    });
}

/**
 * Takes an artwork object and appends it to the gallery
 * @param {Artwork} artwork the artwork to be added to the DOM
 */

