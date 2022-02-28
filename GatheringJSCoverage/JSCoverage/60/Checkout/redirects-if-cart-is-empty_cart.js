import { getPrintSizes, render, calculatePrice } from './frame.js';

var price = 0.0;
//cacheList is for cart items
let cacheList = [];
//cacheMetArray is for met objects
var cachedMetArray = [];
const baseURL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

document.addEventListener('DOMContentLoaded', event => {
    start();
    async function start() {
        // if the cache is empty, display empty items
        if (window.localStorage.getItem('cart') == "[]" || window.localStorage.length == 0) {
            displayEmptyItems();
            return;
        }}
})

//cacheList is an array oj objects that holds the cartObject and store it in localStorage









function displayEmptyItems() {
    const cartContainer = document.querySelector('.cart');
    cartContainer.innerText = "There are no items in your shopping cart.";
    const cartTotal = document.createElement('div');
    cartTotal.setAttribute('class', 'cart-total');
    cartTotal.innerHTML =
        `<div class="price">Total: € <span id="price-total">0</span></div>
    <button type="button" id="checkout-button">Checkout</button>
    `;
    const payButton = cartTotal.querySelector('#checkout-button');
    cartTotal.style.display = "none";
    payButton.disabled = true;
    cartContainer.appendChild(cartTotal);
}


// if a cart item is being removed, the localStorage for cart has to be updated

// this method checks the cache of Met Objects: if they are stored in the localStorage // -> dont fetch and retrieve from cache, otherwise fetch and store it in the cache



