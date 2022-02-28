import {getCartContent} from "./cart-cache.js";

document.addEventListener('DOMContentLoaded', () => updateHeaderCartItemCount());

export function updateHeaderCartItemCount() {
    const count = getCartContent().length;
    if (count > 0) {
        document.getElementById('cart-link').innerText = 'Cart (' + count + ')';
    }
}
