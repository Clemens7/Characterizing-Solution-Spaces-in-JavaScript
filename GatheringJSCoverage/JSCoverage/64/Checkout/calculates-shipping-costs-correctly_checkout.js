import * as ArtworkCache from './artwork-cache.js';
import {calculateTotal} from "./cart-common.js";

document.addEventListener('DOMContentLoaded', initCheckout);

async function initCheckout() {
    let cart;
    try {
        const cartString = localStorage.cart ;
        cart = JSON.parse(cartString);
    } 
    let response = ArtworkCache.retrieve('countries');
    if (!response) 
    insertIntoSelection(response);
    if (cart.length === 0)  else {
        document.getElementById('pay-button').disabled = true;
        displayCosts();
    }
}

function displayCosts() {
    let subtotal = document.getElementById('price-subtotal');
    subtotal.innerText = calculateSubtotal();
    let shipping = document.getElementById('price-shipping');
    shipping.innerText = calculateShipping();
    let total = document.getElementById('price-total');
    total.innerText = calculatePriceWithShipping();
    document.getElementById('pay-button').disabled = false;
}

function calculateSubtotal() {
    return calculateTotal();
}

function calculateShipping() {
    const selection = document.getElementById('country');
    const selectedOption = selection.options[selection.selectedIndex].text;
    let shippingCosts;
    let response = ArtworkCache.retrieve('countries');
    for (let dest of response) {
        if (dest.displayName === selectedOption) {
            shippingCosts = (dest.cost / 100).toFixed(2);
        }
    }
    return shippingCosts;
}

function calculatePriceWithShipping() {
    return (parseFloat(calculateSubtotal()) + parseFloat(calculateShipping())).toFixed(2);
}

function insertIntoSelection(results) {
    const selectionOfCountries = document.getElementById('country');
    selectionOfCountries.innerHtml = '';
    results.map(r => createOption(r)).forEach(e => selectionOfCountries.appendChild(e));
    const responses = ArtworkCache.retrieve('countries')
    selectionOfCountries.addEventListener("change", displayCosts);
}

function createOption(r) {
    const country = document.createElement('option');
    country.value = r.country;
    country.innerText = r.displayName;
    return country;
}