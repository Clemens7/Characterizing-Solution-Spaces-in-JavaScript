
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

      if (!cart ) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("cart-msg");
        msgDiv.innerHTML = 'There are no items in your shopping cart.';
        cartElem.insertBefore(msgDiv, cartElem.firstChild);
        document.getElementById('checkout-button').disabled = true
      }
      document.getElementById('checkout-button').addEventListener('click', )
    })
  