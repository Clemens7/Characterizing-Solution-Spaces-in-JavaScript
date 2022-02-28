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
        if (items) {
            let item_oids = []
            for (let it of items) {
                item_oids.push(it.objectID)
            }
            return SearchAPI.retrieveByObjectIds(item_oids).then(thumbs => {
                console.table(thumbs)
                return { thumbs: thumbs, items: items }
            })
        }
    }).then(tmp => {
        displayCartItem(tmp.items, tmp.thumbs);
    })
}

export async function displayCartItem(items, thumbs) {
    const cartItemContainer = new Cart.CartItemContainer();
    cartItemContainer.clear();
    if (!items ||  items.length == 0 || !thumbs)  else {
        for (let i in items) {
            cartItemContainer.addCartItemToDocument(items[i], thumbs[i], i);
        }
        cartItemContainer.addCartTotalToDocument(items);
        document.getElementById('checkout-button').addEventListener("click", );
    }
}

window.addEventListener("DOMContentLoaded", () => {
    loadCartLink();
    updateCart();
});

