import * as Cart from './cartCache.js'
import {API} from "./api.js";
import * as frame from './frame.js';

let cartObjects = Cart.retrieve();
const api = new API();

showCartItems(cartObjects);
showCartItemNumber(cartObjects);

function showCartItems(cartObjects) {
  if (cartObjects.length == 0) {
    document.getElementById('cart-message').innerText = 'There are no items in your shopping cart.';
    document.getElementById('checkout-button').disabled = true;
  }
}

// Show Number of Cart Items in Header
function showCartItemNumber(cartObjects) {
  const cartHeader = document.getElementById("cart-link");
  if (cartObjects.length !== 0)  else {
    cartHeader.innerText = 'Cart';
  }
}

// Get Cart Item Data from API





//this passes test, but doesn't work when more than 1 item is deleted from cart




document.getElementById('checkout-button').addEventListener("click", , false);
