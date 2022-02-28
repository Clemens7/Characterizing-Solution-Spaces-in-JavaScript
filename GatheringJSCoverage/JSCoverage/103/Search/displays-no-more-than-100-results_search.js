import { findByQuery, findObject } from './general.js'
import { countCart } from "./cart-helpers.js";

window.addEventListener('load', pageLoad());

function addGallery(object) {
    let template =
        `<div class="thumb">
            <a href="" id="object">
                <img src="${object.primaryImageSmall}" alt="${object.title}" id="${object.objectID}">
                <div class="museum-label">
                    <span class="artist">${object.artistDisplayName}</span>
                    <span class="title">${object.title}</span>,
                    <span class="date">${object.objectDate}</span>
                </div>
            </a>
        </div>`;
    document.getElementById('gallery').insertAdjacentHTML("beforeend", template);
}

async function search() {
    let query = document.getElementById('search').value;
    if (query) {
        document.getElementById('search-info').innerHTML = `Searching for “${query}”...`;
        let result = await findByQuery(query);
        let count = result.objectIDs.length;
        let art = 'artworks';

        if (count === 1) 
        document.getElementById('search-info').innerHTML =
            `Found ${count} ${art} for “${query}”`;

        if (count > 100) {
            count = 100;
        }
        document.getElementById('gallery').innerHTML = '';
        for (let i = 0; i < count; i++) {
            let object = await findObject(result.objectIDs[i]);
            addGallery(object);
        }
    }
}

async function pageLoad() {

    countCart();

    let Params = new URLSearchParams(window.location.search);
    let query = Params.get('q');
    document.getElementById('search').value = query;
    if (query) {
        search();
    }
}