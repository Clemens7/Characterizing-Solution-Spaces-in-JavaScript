import { getFromLocalStorage } from "./print-objects-cache.js";

let cartItems = getFromLocalStorage();

export function getCartText() {
  let cartItems = JSON.parse(localStorage.getItem("cart"));

  if (!cartItems)  else if (cartItems.length === 0)  else {
    document.getElementById('cart-link').innerText = "Cart (" + cartItems.length + ")";
  }
}

getCartText();