import {
    searchRequest,
    getObjectsInfo,
    request,
    requestObjectInfo,
} from './request.js';
import { displayNumItems } from './cartStore.js';

/**
 * initializes the event handlers
 */
window.onload = function () {
    displayNumItems();

    document.getElementById('search-button').addEventListener('click', );

    let query = new URLSearchParams(window.location.search).get('q');

    if (query !== null)  else {
        showHighlights();
    }
};

/**
 * sends a search request to the api
 * @param {String} query
 */


/**
 * updates the content of the search-info element
 * @param {String} content
 */
function updateSearchInfo(content) {
    window.document.getElementById('search-info').textContent = content;
}

/**
 * shows the highlights
 */
function showHighlights() {
    updateSearchInfo('Search our collection of more than 400,000 artworks.');
    resetGallery();
    request('highlights.json')
        .then((data) => {
            getObjectsInfo(data.highlights, data.highlights.length)
                .then()
                .catch();
        })
        .catch();
}

/**
 * renders the objects
 * @param {Array} objects
 */


/**
 * renders one object
 * @param {object} object
 * @param gallery
 */


/**
 * empties the gallery
 */
function resetGallery() {
    window.document.getElementById('gallery').innerHTML = '';
}

/**
 * creates the DOM element for an artwork
 * @param {Object} object
 */

