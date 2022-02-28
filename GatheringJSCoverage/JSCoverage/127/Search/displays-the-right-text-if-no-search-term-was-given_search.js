import {API} from "./api.js";
import * as Cart from './cartCache.js';

const api = new API();

function searchMetropolian() {
    if (!location.search.startsWith('?q=') ) {
        displayHighlights();
        return;
    }}

function displayHighlights() {
    updateSearchInfo('Search our collection of more than 400,000 artworks.');
    api.getHighlights()
        .then(function(response) {
            const highlights = response.body.highlights;
            resetGallery();
            for (let id of highlights) {
                api.getById(id)
                    .then();

            }
    });
}



function resetGallery() {
    document.getElementById('gallery').innerHTML = '';
}

function updateSearchInfo(text) {
    document.getElementById('search-info').innerHTML = text;
}

window.addEventListener('DOMContentLoaded', function () {
    searchMetropolian();
    document.getElementById('search-button').addEventListener('click',);
});

// Show Number of Cart Items in Header
showCartItemNumber(Cart.retrieve());

function showCartItemNumber(cartObjects) {
  const cartHeader = document.getElementById("cart-link");
  if (cartObjects.length !== 0)  else {
    cartHeader.innerText = 'Cart';
  }
}
