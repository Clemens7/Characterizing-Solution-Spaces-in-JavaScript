import {$} from './helper.js';
import {getNumberOfObjectsInCart} from './cartStore.js';

export function updateCartCountInHeader() {
    let text = 'Cart';
    let numberOfObjects = getNumberOfObjectsInCart();
    if (numberOfObjects > 0) {
        text += ` (${numberOfObjects})`;
    }
    $('#cart-link').textContent = text;
}
