import { CART } from './artmart-cache.js';

CART.init();

//test
export function setCartCount() {
    if (CART.isEmpty()) {
        document.getElementById('cart-link').innerText = 'Cart';
    }
}