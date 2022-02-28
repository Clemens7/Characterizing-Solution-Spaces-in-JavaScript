import { retrieveJson, fetchJsonFromAPI } from './cache.js';
import { calculatePrice, render } from './frame.js';

const cart = document.getElementById("cart");
let priceTotal = 0;
let id = 0;

document.addEventListener('DOMContentLoaded', event => {
    loadDataAndPopulateUI();
});


async function loadDataAndPopulateUI() {
    priceTotal = 0;
    try {
        let jsonItems = localStorage.getItem('cart');
        const elements = JSON.parse(jsonItems);
        if (elements.length === 0) throw "EmptyCart";catch {
        createPriceAndCheckout();
        displayEmptyCart();
    }}










// iterate over all items and inc counter (counter is delete index for cart-array)





function createPriceAndCheckout() {
    const cartTotal = document.createElement("div");
    cartTotal.className = "cart-total";
    cart.appendChild(cartTotal);
    const price = document.createElement("div");
    price.className = "price";
    price.innerText = "Total: € ";
    cartTotal.appendChild(price);
    const checkoutPriceTotal = document.createElement("span");
    checkoutPriceTotal.id = "price-total";
    checkoutPriceTotal.innerText = `${parseFloat(priceTotal)}`;
    price.appendChild(checkoutPriceTotal);
    const checkoutButton = document.createElement("button");
    checkoutButton.id = "checkout-button";
    checkoutButton.innerText = "Checkout";
    checkoutButton.addEventListener('click', );

    cartTotal.appendChild(checkoutButton);
}

export function updateHeaderCartCount() {
    let jsonItems = localStorage.getItem('cart');
    try {
        const elements = JSON.parse(jsonItems);
        let count = 0;
        elements.forEach();
        const cartLink = document.getElementById("cart-link");
        if (count == 0) {
            cartLink.innerText = 'Cart';
        }
    } 
}

export 
