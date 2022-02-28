import * as ArtworkCache from './artwork-cache.js';
import {render, calculatePrice} from "../frame.js";
import {calculateTotal, displayCartContent} from "./cart-common.js";

document.addEventListener('DOMContentLoaded', initializeCart);

function initializeCart() {
    let cart;
    try {
        const cartString = localStorage.cart || '[]';
        cart = JSON.parse(cartString);
    } 
    const cartContainer = document.getElementById('cart');
    const cartTotalNode = document.getElementsByClassName('cart-total')[0];
    const promises = cart.map().reverse();

    if (cart.length === 0) {
        emptyCartDisplay()
    }
}






function emptyCartDisplay() {
    const cartTotalNode = document.getElementsByClassName('cart-total')[0];
    const cartContainer = document.getElementById('cart');
    const message = "There are no items in your shopping cart.";
    const emptyCartMessage = document.createElement('div');
    emptyCartMessage.id = 'search-info';
    emptyCartMessage.innerText = message;
    cartContainer.insertBefore(emptyCartMessage, cartTotalNode);
    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.disabled = true;
}








