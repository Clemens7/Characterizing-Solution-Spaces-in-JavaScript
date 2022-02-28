import { retrieveCart } from './cache.js';

document.addEventListener("DOMContentLoaded",() => {
    const cart = retrieveCart();
    if(!cart.isEmpty()){
        document.getElementById('cart-link').innerHTML = `Cart (${cart.getItemCount()})`;
    }
});