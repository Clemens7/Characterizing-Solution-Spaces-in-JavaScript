import * as CacheApi from "./cache-api.js";
import * as CONSTANTS from "./constants.js";

export function loadCartLink() {
    const cartLinkElement = document.getElementById('cart-link');
    const cartData = CacheApi.retrieveJson(CONSTANTS.CACHE_CART);
    if (cartData )  else {
        cartLinkElement.innerText = 'Cart';
    }
}

export 