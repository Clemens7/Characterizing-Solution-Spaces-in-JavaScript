import { getFromLocalStorage } from "./print-objects-cache.js";

let cartItems = getFromLocalStorage();

export function getCartText() {
  let cartItems = JSON.parse(localStorage.getItem("cart"));

  if (!cartItems) {
    document.getElementById('cart-link').innerText = "Cart";
  }
}

getCartText();