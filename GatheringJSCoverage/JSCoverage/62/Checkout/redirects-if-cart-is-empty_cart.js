import * as DAL from "./DAL.js";
import * as frame from "./frame.js";

loadCart();

window.document.getElementById("cart-link").innerText = `Cart${getNumOfItems()}`;

window.document.getElementById("checkout-button").addEventListener("click", );

async function loadCart() {
  let artworks = JSON.parse(window.localStorage.getItem("cart"));
  let priceTotal = 0;
  const itemContainer = document.getElementById("cart");

  if (artworks)  else {
    const messageElement = document.createElement("h2");
    messageElement.innerText = "There are no items in your shopping cart.";
    itemContainer.insertBefore(messageElement, itemContainer.firstChild);
    document.getElementById("checkout-button").disabled = true;
  }
}

/**
 * @returns String of form '(n)' where n is the number of items in the cart if n > 0
 *          Empty string otherwise
 */
function getNumOfItems() {
  const cartItems = JSON.parse(window.localStorage.getItem('cart'));
  if (cartItems ) 
  return ''
}










