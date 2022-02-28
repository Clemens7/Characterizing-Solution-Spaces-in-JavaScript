import {API} from "./api.js";
import * as Cart from './cartCache.js';

const api = new API();

function searchMetropolian() {
    if (!location.search.startsWith('?q=') || location.search.length <= 3) 
    updateSearchInfo(`Searching for “${location.search.substr(3).replace('+', ' ')}”...`);
    api.searchByValue(location.search)
        .then();
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
