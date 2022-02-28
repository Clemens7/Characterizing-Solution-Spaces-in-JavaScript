import * as CacheAPI from "./cache-api.js"
import * as CONSTANTS from "./constants.js"
import * as Cart from "./cart-dom.js";
import * as SearchAPI from "./search/search-api.js"
import { loadCartLink } from "./cart-service.js";

export class CartItem {
    
}


// Test functionality
async function updateCart() {
    CacheAPI.retrieveJsonAsync(CONSTANTS.CACHE_CART).then(items => {
        if (items)  else {
            return { thumbs: null, items: items };
        }
    }).then(tmp => {
        displayCartItem(tmp.items, tmp.thumbs);
    })
}

export async function displayCartItem(items, thumbs) {
    const cartItemContainer = new Cart.CartItemContainer();
    cartItemContainer.clear();
    if (!items ) {
        cartItemContainer.addEmptyMessageToDocument();
        return;
    }}

window.addEventListener("DOMContentLoaded", () => {
    loadCartLink();
    updateCart();
});

