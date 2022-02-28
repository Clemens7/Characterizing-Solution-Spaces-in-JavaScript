import { fetchCart } from './cart.js';

export const getQueryParameter = 

export const setCartQty = () => {
  const cart = fetchCart();
  const element = document.getElementById('cart-link');
  element.innerText = cart.length === 0  : `Cart (${cart.length})`;
}
