
        import {Artwork} from './artwork.js';
        import * as Frame from './frame.js';
        import * as CartHelper from './cartHelper.js';
        import * as Cache from './artwork-cache.js';

      

        

        

        async function fillCart() {
            const cartContainer = document.getElementById('cart');
            if (!localStorage.getItem('cart')) 
            let i = 0;
            const cartItems = JSON.parse(localStorage.getItem('cart'));
            for (let cartItem of cartItems) 

            cartContainer.innerHTML += `
            <div class="cart-total">
                <div class="price">Total: € <span id="price-total">0</span></div>
                <button type="button" id="checkout-button" onclick="window.location.href='checkout.html';">Checkout</button>
            </div>
      `;

            CartHelper.getCartItemNumber();
            CartHelper.calculateTotalPrice();
            for (let buttons of document.getElementsByClassName('cart-remove')) 
        }

        fillCart();

        

    