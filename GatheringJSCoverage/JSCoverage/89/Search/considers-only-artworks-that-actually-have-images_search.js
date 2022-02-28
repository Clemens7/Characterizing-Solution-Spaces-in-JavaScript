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

    if (query !== null) {
        console.log('query not null');
        document.getElementById('search').value = query;
        doSearch(query);
    }
};

/**
 * sends a search request to the api
 * @param {String} query
 */
function doSearch(query) {
    if (query === '')  else {
        let urlSearchParam = new URLSearchParams(window.location.search);
        urlSearchParam.set('q', query);

        window.history.replaceState({}, '', `?${urlSearchParam.toString()}`);

        updateSearchInfo(`Searching for “${query}”...`);
        resetGallery();

        searchRequest(query)
            .then()
            .catch();
    }
}

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

