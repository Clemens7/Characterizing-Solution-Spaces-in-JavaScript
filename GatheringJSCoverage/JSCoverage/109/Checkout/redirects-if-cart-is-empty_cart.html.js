
        import {Artwork} from './artwork.js';
        import * as Frame from './frame.js';
        import * as CartHelper from './cartHelper.js';
        import * as Cache from './artwork-cache.js';

      

        

        

        async function fillCart() {
            const cartContainer = document.getElementById('cart');
            if (!localStorage.getItem('cart')) {
                cartContainer.innerHTML += `<div><span>There are no items in your shopping cart.</span></div>`;
                cartContainer.innerHTML += `
            <div class="cart-total">
                <div class="price">Total: € <span id="price-total">0</span></div>
                <button type="button" id="checkout-button" disabled>Checkout</button>
            </div>
      `;
                return;
            }}

        fillCart();

        

    