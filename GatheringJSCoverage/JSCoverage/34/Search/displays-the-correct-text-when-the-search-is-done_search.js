import {getArtworkIDsFiltered, getOneArtworkByID} from './searchService.js'
import {Artwork} from "./artwork.js";
import * as artworkDom from './artworkDom.js'
import {displayCartCount} from './main.js'



const form = document.getElementById('search-form');
form.addEventListener("submit", );


document.addEventListener("DOMContentLoaded", () => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let searchInput = urlParams.get("q");

    if (searchInput !== undefined && searchInput !== null) {
        searchInput = searchInput.replace("+", " ");
        fetchArtworks(searchInput)
    }

    //display cart count
    displayCartCount();
});

/**
 *  Reads Highlight JSON and calls getHighlightInfo()
 */


function fetchArtworks(searchparam) {
    // Set the searchTextHeader
    let searchTextHeader = document.getElementById("search-info");
    searchTextHeader.innerText = `Searching for “${searchparam}”...`;

    // Fetch artwork ids for the given search parameter
    getArtworkIDsFiltered(searchparam)
        .then(result => {
            return result.objectIDs
        })
        .then(result => {
            // API returns null, if no artworks could be found
            if (result === null) {
                setSearchHeaderText(0, searchparam);
                return;
            }})
}

/**
 * Sets the headline on the search page based on the given params
 * @param amountOfArtworks  The number of artworks which should be displayed
 * @param searchparam       The searchparameter which has been used
 */
function setSearchHeaderText(amountOfArtworks, searchparam) {
    let searchTextHeader = document.getElementById("search-info");
    searchTextHeader.innerText = `Found ${amountOfArtworks} ` + (amountOfArtworks === 1  : "artworks") + ` for “${searchparam}”`;
}

/**
 *  Gets the Object for each ID from Metropolitan Museum of Art Collection API, todo calls function to add html to page
 */

