import {getNumberOfObjectsInCart, getObjectsFromCart, removeObjectFromCart} from "./cartStore.js";
import {calculatePrice, render} from "./frame.js";
import {updateCartCountInHeader} from "./header.js";
import {getArtObjectByID} from "./artStore.js";

let totalSum = 0;

export async function createCart() {
    const cart = document.getElementById('cart');
    if (!getNumberOfObjectsInCart()) { // if no items in cart
        const item = document.createElement('div');
        item.className = 'cart-item';
        item.textContent = "There are no items in your shopping cart.";
        item.style.fontSize = "1.5rem";
        item.style.margin = "1rem 1rem 2rem 1rem";
        item.style.textAlign = "center";
        cart.appendChild(item);
    }
    cart.appendChild(createCheckOutButton());
}



function createCheckOutButton() { // total price and checkout button
    const cartTotalDiv = document.createElement('div');
    cartTotalDiv.className = 'cart-total';
    cartTotalDiv.innerHTML = `<div class="price">Total: € <span id="price-total">${totalSum.toFixed(2)}</span></div>`;
    const checkOutButton = document.createElement('button');
    checkOutButton.id = "checkout-button";
    checkOutButton.textContent = "Checkout";
    if (!getNumberOfObjectsInCart()) { // disable button if there are no items in cart
        checkOutButton.disabled = true;
    }
    cartTotalDiv.append(checkOutButton);
    return cartTotalDiv;
}

// Build textual description of the configuration for the artwork


export 