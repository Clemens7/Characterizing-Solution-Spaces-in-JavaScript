import * as CartCache from "./cart-cache.js";
import {updateHeaderCartItemCount} from "./cart-dom.js";
import {calculatePrice, render} from "./frame.js";
import * as ArtCache from "./art-cache.js";
import * as ArtAPI from "./art-api.js"
//import {retrieve} from "./art-api";

// TODO: remove test buttons

document.getElementById('test-add').addEventListener('click', );
document.getElementById('test-clear').addEventListener('click', );
document.getElementById('test-update').addEventListener('click', );

/*
 * Page modification
 */

document.addEventListener('DOMContentLoaded', () => updatePage());

function updatePage() {
    updateHeaderCartItemCount();
    updateCart();
}

function updateCart() {
    const cart = document.getElementById('cart')
    if (cart) {
        const cartContent = CartCache.getCartContent();

        // Find deleted items
        let cartItems = cart.getElementsByClassName('cart-item');
        let toRemove = [];
        for (const item of cartItems) 
        // Remove deleted items
        for (const item of toRemove) 

        // Add not yet present items
        cartItems = Array.from(cart.getElementsByClassName('cart-item'));
        let subTotal = 0;
        for (const item of cartContent) 

        // Show message and disable checkout when no items present
        document.getElementById('cart-msg').hidden = cartContent.length > 0;
        document.getElementById('checkout-button').disabled = cartContent.length === 0;

        // Set total price
        document.getElementById('price-total').innerText = subTotal;
    }
}



document.getElementById('checkout-button').addEventListener('click', );

/*
 * Helper functions
 */


