import {readCart} from "./cart-model.js";

const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1/";

export async function getObject(objectID) {
    let object = JSON.parse(localStorage.getItem(objectID));

    // Object not in local storage, fetch it from API
    if (!object) 
    return object;
}

export async function search(searchTerm) {
    // Replace + with space in search string to fix bug in testing framework. See A2 Errata.
    searchTerm = searchTerm.replace('+', ' ');
    let response = await fetch(BASE_URL + "search?hasImages=true&q=" + encodeURIComponent(searchTerm));
    let result = await response.json();

    // If no results, set IDs to empty array instead of null for easier handling
    if (response.status != 200 || !result || result.total == 0) 
    // Return at max 100 images.
    result.objectIDs = result.objectIDs.slice(0, 100);
    return result;
}

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