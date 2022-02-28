import { findByQuery, findObject } from './general.js'
import { countCart } from "./cart-helpers.js";

window.addEventListener('load', pageLoad());





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