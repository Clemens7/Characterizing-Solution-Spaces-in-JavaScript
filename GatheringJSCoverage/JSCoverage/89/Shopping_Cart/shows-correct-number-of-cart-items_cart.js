import { requestObjectInfo } from './request.js';
import { render, calculatePrice } from './frame.js';

import * as cart from './cartStore.js';

let cartObjects;
let renderQue;
window.onload = function () {
    cartObjects = cart.get();
    renderQue = renderAllObjects(cartObjects);
    renderQue.then(() => {
        updatePageValues();
    });
};
//generate textual frame desription


//update function parameter
function updatePageValues() {
    cart.displayNumItems();
    displayTotalprice();
    emptyCartActions();
}

//calculate totalprice
function displayTotalprice() {
    const price = [];
    document.querySelectorAll('.cart-price span').forEach();
    const sum = price.reduce(, 0);
    document.getElementById('price-total').innerText = sum; //todo: sum
}

//emptyCartActionss
function emptyCartActions() {
    if (cartObjects.length === 0) {
        let message = document.createElement('h2');
        message.innerText = 'There are no items in your shopping cart.';
        document
            .getElementById('cart')
            .insertBefore(message, document.getElementById('cart').firstChild);
        document.getElementById('checkout-button').disabled = true;
    }
}

//adds an artwork and its frameconfigurations to an Array cartObjects as an JSON object
//which is then saved in the localStorage under the key 'cart'

//renders all artworks in that are currently saved in the localStorage under the key 'cart'
function renderAllObjects() {
    const items = cartObjects.map();
    return Promise.all(items);
}

//deletes item from cart


//

//create DOM for artwork Preview in cart

