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
                .then((data) => {
                    renderObjects(data.objects);
                })
                .catch();
        })
        .catch();
}

/**
 * renders the objects
 * @param {Array} objects
 */
function renderObjects(objects) {
    const gallery = window.document.getElementById('gallery');

    for (const object of objects) {
        renderObject(object, gallery);
    }
}

/**
 * renders one object
 * @param {object} object
 * @param gallery
 */
function renderObject(object, gallery) {
    gallery.appendChild(createObject(object));
}

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
function createObject(object) {
    let template = document.createElement('template');
    template.innerHTML = `<div class="thumb">
			<a href="config.html?objectID=${object.objectID}" id="object-${object.objectID}">
				<img src="${object.primaryImageSmall}" alt="${object.title} ${object.artistDisplayName}" id="object-image-0" />
				<div class="museum-label">
					<span class="artist">
						${object.artistDisplayName}
					</span>
					<span class="title">${object.title}</span>, <span class="date">${object.objectDate}</span>
				</div>
			</a>
		</div>`.trim();
    return template.content.firstChild;
}
