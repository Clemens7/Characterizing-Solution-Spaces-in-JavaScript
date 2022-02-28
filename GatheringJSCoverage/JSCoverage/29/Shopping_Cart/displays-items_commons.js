import * as DOM from "./dom-helpers.js";

const CACHE_KEY = 'cart';
const ENDPOINT = "https://collectionapi.metmuseum.org/public/collection/v1/";

export class CartItem {
    
}

export function storeCartInCache(cart) {
    console.log(`Storing ${CACHE_KEY} in local storage`);
    localStorage[CACHE_KEY] = JSON.stringify(cart);
}

export function retrieveCartFromCache() {
    const key = CACHE_KEY;
    if (key in localStorage) {
        return JSON.parse(localStorage[key]);
    }
}

export 

export function showCartItemsNumber() {
    let cartLink = document.getElementById('cart-link');
    let cart = retrieveCartFromCache()
    if (cart.length === 0)  else {
        DOM.setAttributes(cartLink, {innerText: `Cart (${cart.length})`})
    }
    return cart.length;
}

export async function object(objectId) {
    const res = await fetch(`${ENDPOINT}objects/${objectId}`);
    return res.json();
}