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
if (url.indexOf("q=") !== -1) {
  let queryString = url.slice(url.indexOf("q=") + 2);
  queryString = queryString.replace("+", " ");
  searchGallery(queryString);
}

//search field search
const searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", );



async function searchGallery(searchString) {
  let searchText = document.getElementById("search-info");
  searchText.innerText = `Searching for “${searchString}”...`;
  const retrievedObjectIds = await getObjectIds(searchString);
  if (retrievedObjectIds == null) {
    searchText.innerText = `Found 0 artworks for “${searchString}”`;
  }
}


