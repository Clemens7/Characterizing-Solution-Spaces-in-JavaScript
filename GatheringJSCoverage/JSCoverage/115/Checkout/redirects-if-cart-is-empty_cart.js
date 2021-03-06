import { loadObject, metAPI } from './metApi.js';
import { render, calculatePrice } from './frame.js';

const cart = document.getElementById('cart');

let items = localStorage.getItem('cart');

if (!items) {
  let h2 = document.createElement('h2');
  h2.textContent = 'There are no items in your shopping cart.';
  cart.insertBefore(h2, document.getElementById('cart-footer'));
  const checkoutButton = document.getElementById('checkout-button');
  checkoutButton.disabled = true;
}