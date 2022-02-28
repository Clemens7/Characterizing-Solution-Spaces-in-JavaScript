import { findByQuery, findObject } from './general.js'
import { countCart } from "./cart-helpers.js";

window.addEventListener('load', pageLoad());



async function search() {
    let query = document.getElementById('search').value;
    if (query) {
        document.getElementById('search-info').innerHTML = `Searching for “${query}”...`;
        let result = await findByQuery(query);}

async function pageLoad() {

    countCart();

    let Params = new URLSearchParams(window.location.search);
    let query = Params.get('q');
    document.getElementById('search').value = query;
    if (query) {
        search();
    }
}