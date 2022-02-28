import * as Frame from './frame.js';

export 

export function getItems() {
    let cart = localStorage.getItem('cart');
    if (!cart) 
    return JSON.parse(cart);
}

export function updateCartString() {
    let cartLink = document.getElementById('cart-link');
    let noOfItems = getItems().length;
    let cartString = '';
    if (noOfItems > 0) cartString = ` (${noOfItems})`;
    cartLink.innerText = `Cart${cartString}`;
}

export 

export 