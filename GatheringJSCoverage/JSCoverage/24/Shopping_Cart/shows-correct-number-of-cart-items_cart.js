import { loadObject } from "./artworkApi.js";
import { render, calculatePrice } from "./frame.js"

export function getItems() {
    return JSON.parse(localStorage.getItem('cart')) ;
}

export 

export 

export function renderCart() {
    document.getElementById('cart-link').innerText = `Cart (${getItems().length})`;
}

function isEmpty() {
    return getItems().length < 1;
}

export async function initCart() {
    renderCart()

    const cart_items = document.getElementById('cart');
  
    // disable checkout button when cart is empty
    if (isEmpty()) {
      const empty_cart = document.createElement('div');
      empty_cart.classList.add('cart-item');
      empty_cart.innerHTML = `<span>There are no items in your shopping cart.</span>`;
      cart_items.insertBefore(empty_cart, cart_items.firstChild);
      document.getElementById('checkout-button').disabled = true;
    }

    // generate cart items
    let price_total = 0;
    const items = getItems();

    for(let i = 0; i < items.length; i++) 
    //set total price
    document.getElementById('price-total').innerHTML = price_total.toFixed(2);

    //remove from cart
    window.remove = 
}

