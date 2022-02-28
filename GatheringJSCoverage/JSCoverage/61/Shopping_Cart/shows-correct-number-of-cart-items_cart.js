import {fetchArtwork} from './common.js';
import {render} from './frame.js';
import {calculatePrice} from './frame.js';

function showItems() {
    items = 0;
    priceTotal = 0;
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!Array.isArray(cart) || cart.length === 0) {
        document.getElementById('cart-link').innerHTML = 'Cart';
        document.getElementById('cart').insertAdjacentHTML('afterbegin', '<p>There are no items in your shopping cart.</p>');
        document.getElementById('checkout-button').disabled = true;
        document.getElementById('price-total').innerHTML = '0.00';
    }
}





let items;
let priceTotal;
showItems();
document.getElementById('checkout-button').addEventListener('click', );
