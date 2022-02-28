
    import { getArtById } from './apiCalls.js'
    import { render, calculatePrice } from './frame.js'
    import { store, retrieve } from './metCache.js'

    const urlParams = new URLSearchParams(window.location.search);
    const sizeString = { 'S': 'Small', 'M': 'Medium', 'L': 'Large' };
    let price = 0;
    let cart = [];


    const removeItem = ;


    const appendCartItem = ;

    const cartElem = document.getElementById("cart");

    document.addEventListener('DOMContentLoaded', async e => {
      cart = JSON.parse(localStorage.getItem('cart'));
      console.log('cart', cart);

      if (!cart || !Array.isArray(cart))  else {
        document.getElementById('cart-link').innerHTML = `Cart (${cart.length})`;
        cart.forEach();
        document.getElementById("price-total").innerHTML = `${price}`;
      }
      document.getElementById('checkout-button').addEventListener('click', )
    })
  