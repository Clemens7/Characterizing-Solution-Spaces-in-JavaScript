import { fetchCart } from './cart.js';

export const getQueryParameter = (param) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

export const setCartQty = () => {
  const cart = fetchCart();
  const element = document.getElementById('cart-link');
  element.innerText = cart.length === 0 ? 'Cart' ;
}
