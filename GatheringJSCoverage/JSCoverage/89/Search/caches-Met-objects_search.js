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
            .then((data) => {
                if (data.total === 1)  else {
                    updateSearchInfo(
                        `Found ${data.total} artworks for “${query}”`
                    );
                }

                const objects = data.objectIDs.splice(0, 100);
                const gallery = window.document.getElementById('gallery');

                for (const object of objects) {
                    requestObjectInfo(object)
                        .then((data) => {
                            renderObject(data, gallery);
                        })
                        .catch();
                }
            })
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
