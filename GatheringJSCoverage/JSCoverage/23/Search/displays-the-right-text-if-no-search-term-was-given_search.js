import {
  getObjectIds,
  getHighlights,
  getGalleryItems,
} from "./search-api-calls.js";
import { getFromLocalStorage } from "./print-objects-cache.js";

/*let cartVar = localStorage.getItem('cartItems');
console.log(cartVar);
if (cartVar != "0") {
    const cartSize = document.getElementById("cart-link");
    cartSize.innerText = 'Cart (' + cartVar + ')';
}*/




/*let cartItems = getFromLocalStorage();
localStorage.setItem('cartItems', JSON.parse(cartItems.length));
console.log(localStorage.getItem('cartItems'));
const cartSize = document.getElementById("cart-link");
cartSize.innerText = `Cart (${cartItems.length})`;

if (cartItems.length === 0 ) {
  cartSize.innerText = `Cart`;
}*/

//query search
const url = window.location.href;
if (url.indexOf("q=") !== -1)  else {
  searchHighlights();
}

//search field search
const searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", );

async function searchHighlights() {
  let galleryItems = await getHighlights();}




