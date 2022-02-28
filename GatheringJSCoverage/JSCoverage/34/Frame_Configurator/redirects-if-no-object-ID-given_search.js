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

    if (searchInput !== undefined && searchInput !== null)  else {
        initializeHighlights()
    }

    //display cart count
    displayCartCount();
});

/**
 *  Reads Highlight JSON and calls getHighlightInfo()
 */
function initializeHighlights() {
    let response;
    fetch('./highlights.json')
        .then(response => {
                return response.json();
            }
        )
        .then(result => {
            return result["highlights"];
        })
        .then(result => {
            response = getHighlightInfo(result);
        });
}



/**
 * Sets the headline on the search page based on the given params
 * @param amountOfArtworks  The number of artworks which should be displayed
 * @param searchparam       The searchparameter which has been used
 */


/**
 *  Gets the Object for each ID from Metropolitan Museum of Art Collection API, todo calls function to add html to page
 */
function getHighlightInfo(highlights) {
    let gallery = document.getElementById('gallery');

    for (let i in highlights) {
        if (highlights.hasOwnProperty(i)) {
            let id = highlights[i];
            getOneArtworkByID(id).then()

        }
    }

}
