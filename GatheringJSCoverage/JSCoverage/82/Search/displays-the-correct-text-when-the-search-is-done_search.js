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

    if (search.has('q') && q !== '') {
        document.querySelector("#search-info").innerText = `Searching for “${q}”...`;
        searchForTerm(q).then((data) => {
            if (data.total > 100) 
            total = data.total;
            if (total > 100) 
            if (data.objectIDs != null) 
            if (total === 1)  else {
                document.querySelector("#search-info").innerText = `Found ${total} artworks for “${q}”`;
            }
        });
    }
}





