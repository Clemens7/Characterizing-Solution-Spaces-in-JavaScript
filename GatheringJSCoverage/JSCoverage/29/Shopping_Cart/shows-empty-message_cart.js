import * as DOM from './dom-helpers.js';
import * as FRAME from '../frame.js';
import * as COMMONS from "./commons.js";

let cartItems = [];

window.onload = function WindowLoad() {
    cartItems = COMMONS.retrieveCartFromCache();
    if (cartItems.length > 0) 
    attachTotalPrice();
    showHeaderNoItems();
    attachButtonCheckoutNavigation();
}









function attachTotalPrice() {
    let priceTotal = 0;
    for (const item of cartItems) 
    document.getElementById('price-total').innerText = (priceTotal / 100).toFixed(2);
}

function showHeaderNoItems() {
    if (COMMONS.showCartItemsNumber() === 0) {
        createEmptyCart();
    }
}

function createEmptyCart() {
    document.getElementById('checkout-button').disabled = true;
    const cart = document.getElementById('cart');
    let itemToInsert = document.createElement('h2');
    itemToInsert.innerText = 'There are no items in your shopping cart.';
    cart.insertBefore(itemToInsert, cart.firstChild);
}

function attachButtonCheckoutNavigation() {
    document.getElementById('checkout-button').onclick = 
}