import { Artwork } from "./artwork.js";
import * as ArtworkCache from "./artwork-cache.js";

const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1/";
const HIGHLIGHTS_SRC = "./highlights.json";

// Automatically converts "+" to " " (for test cases)
const SEARCH_BOX = document.getElementById("search");
SEARCH_BOX.addEventListener('input', )

// Checks if there is a query parameter in the URL and conducts a search
document.addEventListener('DOMContentLoaded', event => {
    if ((window.location.href).includes("?q=")) {
        const temp = window.location.href.split("?q=");
        var searchString = temp[temp.length - 1].split("+").join(" ");
        search(searchString);
    }
});

/**
 * Shows highlights
 */


/**
 * Conducts a search by taking a searchString
 * @param {String} searchString the string to search for
 */
export async function search(searchString) {
    const searchBar = document.getElementById("search");
    const searchInfo = document.getElementById("search-info");
    // Check for empty search
    if (searchString.length === 0) 

    // Reset previous search remainders
    searchBar.style = '';
    document.getElementById("gallery").innerHTML = "";
    searchInfo.innerText = "Searching for “" + searchString + "”...";

    console.log('Searching for ' + searchString + "...");
    try {
        // Request from API
        const response = await fetch(BASE_URL + "search?q=" + searchString + "&hasImages=true");
        let { total, objectIDs } = await response.json();

        if (total !== 0) {
            console.log("Received result artwork IDs (" + total + ")");
            searchInfo.innerText = `Found ${total} artwork${total === 1  : 's'} for “${searchString}”`;
            // Truncate result array
            objectIDs = objectIDs.splice(0, 100);
            fetchAndShowArtworks(objectIDs);
        }
        console.log("Search completed")
    } 
}

/**
 * Fetch and show artworks
 * @param {array} objectIDs the objectIDs to fetch and show
 */
async function fetchAndShowArtworks(objectIDs) {
    for (const ID of objectIDs) {
        fetchArtwork(ID)
            .then((artwork) => {
                appendArtworkToGallery(ID, artwork);
            }).catch();
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
        if (artwork) {
            resolve(artwork);
        }
    });
}

/**
 * Takes an artwork object and appends it to the gallery
 * @param {Artwork} artwork the artwork to be added to the DOM
 */
function appendArtworkToGallery(ID, artwork) {
    const gallery = document.getElementById("gallery");
    var artworkContainer = document.createElement('div');
    artworkContainer.classList.add("thumb");
    artworkContainer.innerHTML =
`<a href="config.html?objectID=${ID}">
    <img src="${artwork.image}" alt="${artwork.title}" id="object-image-0">
    <div class="museum-label">
        <span class="artist">${artwork.artist}</span>
        <span class="title">${artwork.title}</span>,
        <span class="date">${artwork.date}</span>
    </div>
</a>`;
    gallery.appendChild(artworkContainer);
}
