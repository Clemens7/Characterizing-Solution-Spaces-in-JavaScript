import * as DOM from "./dom-helpers.js";

const CACHE_KEY = 'cart';
const ENDPOINT = "https://collectionapi.metmuseum.org/public/collection/v1/";

export class CartItem {
    
}

export 

export function retrieveCartFromCache() {
    const key = CACHE_KEY;
    if (key in localStorage) 
    else {
        return [];
    }
}

export 

export function showCartItemsNumber() {
    let cartLink = document.getElementById('cart-link');
    let cart = retrieveCartFromCache()
    if (cart.length === 0) {
        DOM.setAttributes(cartLink, {innerText: `Cart`})
    }
    return cart.length;
}

export 