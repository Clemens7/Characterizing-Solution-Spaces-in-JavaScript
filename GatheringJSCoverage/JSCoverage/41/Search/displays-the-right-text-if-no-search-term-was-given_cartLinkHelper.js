
import * as CartCache from './cartCache.js';
export async function updateCartLink() {
    const items = await CartCache.retrieveAll();
    if (!items ) {
        document.getElementById("cart-link").innerText = `Cart`;
    }
}