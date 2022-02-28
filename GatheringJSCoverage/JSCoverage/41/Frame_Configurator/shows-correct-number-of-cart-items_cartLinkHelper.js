
import * as CartCache from './cartCache.js';
export async function updateCartLink() {
    const items = await CartCache.retrieveAll();
    if (!items || items.length < 1) {
        document.getElementById("cart-link").innerText = `Cart`;
    }
}