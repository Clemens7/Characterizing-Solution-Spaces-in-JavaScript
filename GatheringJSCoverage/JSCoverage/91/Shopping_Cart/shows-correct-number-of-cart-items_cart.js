import { Artwork } from "./artwork.js";
import { render, calculatePrice } from "./frame.js";
import * as artworkCache from './artwork-cache.js';

renderCart();

function renderCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) ;

    Promise.all(cart.map()).then((data) => {
        let insertStrings = data.map();

        let totalPrice = 0;
        data.forEach();

        document.getElementById('cart').innerHTML = insertStrings.join('\n') +
        `${cart.length === 0 ? '<h2>There are no items in your shopping cart.</h2>' }
        <div class="cart-total">
            <div class="price">Total: € <span id="price-total">${totalPrice.toFixed(2)}</span></div>
            <button type="button" id="checkout-button" href="checkout.html" ${cart.length === 0 ? 'disabled' }>Checkout</button>
        </div>`;


        data.forEach();

        document.getElementById('checkout-button').addEventListener('click', );
    });
}


