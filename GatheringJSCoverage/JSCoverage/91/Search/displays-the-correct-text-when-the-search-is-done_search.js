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

        if (total !== 0)  else {
            console.log("Search returned no results");
            searchInfo.innerText = "Found 0 artworks for “" + searchString + "”";
        }
        console.log("Search completed")
    } 
}

/**
 * Fetch and show artworks
 * @param {array} objectIDs the objectIDs to fetch and show
 */


/**
 * Fetches an artwork with a specific id
 * @param {number} artworkID
 * @returns {Artwork} an artwork object containing only relevant information (for the search-page at least)
 */


/**
 * Takes an artwork object and appends it to the gallery
 * @param {Artwork} artwork the artwork to be added to the DOM
 */

