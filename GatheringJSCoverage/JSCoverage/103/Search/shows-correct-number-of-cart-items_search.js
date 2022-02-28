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



async function pageLoad() {

    countCart();

    let Params = new URLSearchParams(window.location.search);
    let query = Params.get('q');
    document.getElementById('search').value = query;
    if (query)  else {

        let res = await fetch('highlights.json').then(response => response.json());
        document.getElementById('gallery').innerHTML = '';
        console.log(res);
        for (let i = 0; i < res.highlights.length; i++) {
            let object = await findObject(res.highlights[i]);
            addGallery(object);
        }
    }
}