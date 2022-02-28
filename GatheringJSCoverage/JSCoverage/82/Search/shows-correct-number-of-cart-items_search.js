import {searchForTerm} from './met.js';
import {retrieveObject} from './met.js';
import {cacheObject} from './cache.js';
import {getStoredObject} from './cache.js';
import {getCartLength} from "./cache.js";

const HIGHLIGHTS = [39799, 459055, 437853, 435809, 436535, 360018, 634108, 459080, 435882, 271890, 459054, 436105];


let search = new URLSearchParams(window.location.search);
window.onload = function WindowLoad(event) {
    update();
};

function update() {
    //Chrome throws an error if fetch is called too early
    document.querySelector('#cart-link').innerHTML = ((getCartLength() === 0) ? "Cart" );
    let q = search.get('q');
    let total = 0;

    if (search.has('q') )  else {
        for (const id of HIGHLIGHTS) {
            const cachedArtwork = getStoredObject(id);
            if (cachedArtwork === null)  else {
                createImageAndDescription(cachedArtwork);
            }
        }
    }
}




function createImageAndDescription(data) {
    let thumb = document.createElement('div');
    thumb.setAttribute('class', 'thumb');

    let anchor = document.createElement('a');
    anchor.setAttribute('href', `config.html?objectID=${data.objectID}`);
    anchor.setAttribute('id', `object-${data.objectID}`);

    let image = document.createElement('img');
    //might be primaryImageSmall
    image.setAttribute('src', data.primaryImageSmall);
    image.setAttribute('alt', '');
    image.setAttribute('id', `object-image-${data.objectID}`);

    let label = document.createElement('div');
    label.setAttribute('class', 'museum-label');

    let artist = document.createElement('span');
    artist.setAttribute('class', 'artist');
    artist.innerText = data.artistDisplayName;

    let title = document.createElement('span');
    title.setAttribute('class', 'title');
    title.innerText = data.title + ', ';

    let date = document.createElement('span');
    date.setAttribute('class', 'date');
    date.innerText = data.objectDate;

    label.appendChild(artist);
    label.appendChild(title);
    label.appendChild(date);
    anchor.appendChild(image);
    anchor.appendChild(label);
    thumb.appendChild(anchor);
    document.getElementById('gallery').appendChild(thumb);
}
