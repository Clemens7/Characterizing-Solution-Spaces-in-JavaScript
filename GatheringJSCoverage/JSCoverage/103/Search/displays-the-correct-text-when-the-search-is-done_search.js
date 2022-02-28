import { findByQuery, findObject } from './general.js'
import { countCart } from "./cart-helpers.js";

window.addEventListener('load', pageLoad());



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

        if (count > 100) 
        document.getElementById('gallery').innerHTML = '';
        for (let i = 0; i < count; i++) 
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