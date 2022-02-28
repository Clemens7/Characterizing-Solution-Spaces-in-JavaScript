import * as Cache from "./cache.js";
import * as Util from "./util.js";
import * as Frame from "./frame.js";
import {Cart} from "./cart.js";
import * as Api from "./api.js";

async function loadData() {
    cartSection.innerText = '';

    if(Cache.retrieveCart().getItemCount() === 0) {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        const emptyCartSpan = document.createElement('span');
        emptyCartSpan.innerText = 'There are no items in your shopping cart.';
        cartItemDiv.appendChild(emptyCartSpan);
        cartSection.appendChild(cartItemDiv);
    }
    addCheckoutSection();
}









function addCheckoutSection() {
    const cartTotalDiv = document.createElement('div');
    cartTotalDiv.classList.add('cart-total');

    const priceDiv = document.createElement('div');
    priceDiv.classList.add('price');
    priceDiv.innerText = 'Total: € ';
    const priceTotalSpan = document.createElement('span');
    priceTotalSpan.id = 'price-total';
    priceTotalSpan.innerText = Util.formatPrice(Cache.retrieveCart().getTotalPrice());
    priceDiv.appendChild(priceTotalSpan);

    const checkoutButton = document.createElement('button');
    checkoutButton.type = 'button';
    checkoutButton.id = 'checkout-button';
    checkoutButton.innerText = 'Checkout';
    checkoutButton.disabled = Cache.retrieveCart().getItemCount() === 0;
    checkoutButton.addEventListener('click', );

    cartTotalDiv.appendChild(priceDiv);
    cartTotalDiv.appendChild(checkoutButton);

    cartSection.appendChild(cartTotalDiv);
}

const cartSection = document.getElementById('cart');

loadData();
