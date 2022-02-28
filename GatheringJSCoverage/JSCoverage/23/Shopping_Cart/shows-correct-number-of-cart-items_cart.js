import { render, calculatePrice } from "./frame.js";
import { getGalleryItemFromObjectId } from "./search-api-calls.js";
import { getFromLocalStorage } from "./print-objects-cache.js";
import { getCartText } from "./header.js";

let cartItems = getFromLocalStorage();

if(cartItems === null || cartItems.length === 0) {
  const cardSection = document.getElementById("cart");
  cardSection.insertAdjacentText("afterbegin", "There are no items in your shopping cart.");
  document.getElementById("checkout-button").disabled = true;
}