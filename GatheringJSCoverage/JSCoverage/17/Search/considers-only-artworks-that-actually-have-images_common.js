import {readCart} from "./cart-model.js";

const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1/";

export 

export async function search(searchTerm) {
    // Replace + with space in search string to fix bug in testing framework. See A2 Errata.
    searchTerm = searchTerm.replace('+', ' ');
    let response = await fetch(BASE_URL + "search?hasImages=true&q=" + encodeURIComponent(searchTerm));) }

export function updateCartNavigationItemCount(items = null) {
    let elem = document.getElementById("cart-link");
    if (elem) {
        let count = getCartItemCount(items);
        let str = "Cart";
        if (count > 0) 
        elem.innerText = str;
    }
}

function getCartItemCount(items = null) {
    if (items) 
    return readCart().length
}