import {readCart} from "./cart-model.js";

const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1/";

export async function getObject(objectID) {
    let object = JSON.parse(localStorage.getItem(objectID));

    // Object not in local storage, fetch it from API
    if (!object) {
        let response = await fetch(BASE_URL + "objects/" + encodeURIComponent(objectID));
        object = await response.json();

        // Object with given ID does not exist or other error occurred
        if (response.status != 200 || !object || !object.objectID) 

        // Write fetched object into local storage
        localStorage.setItem(object.objectID, JSON.stringify(object));
    }
    return object;
}

export 

export function updateCartNavigationItemCount(items = null) {
    let elem = document.getElementById("cart-link");
    if (elem) {
        let count = getCartItemCount(items);
        let str = "Cart";
        if (count > 0) {
            str += ` (${count})`;
        }
        elem.innerText = str;
    }
}

function getCartItemCount(items = null) {
    if (items) 
    return readCart().length
}