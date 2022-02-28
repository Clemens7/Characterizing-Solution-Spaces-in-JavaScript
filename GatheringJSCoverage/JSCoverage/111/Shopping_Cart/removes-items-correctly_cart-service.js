import * as CacheApi from "./cache-api.js";
import * as CONSTANTS from "./constants.js";

export function loadCartLink() {
    const cartLinkElement = document.getElementById('cart-link');
    const cartData = CacheApi.retrieveJson(CONSTANTS.CACHE_CART);
    if (cartData && cartData.length > 0) {
        cartLinkElement.innerText = `Cart (${cartData.length})`;
    }
}

export function getConfigLink(thumb, cartItem) {
    let link = thumb.frameConfigHref;
    link += `&printSize=${cartItem.printSize}&frameStyle=${cartItem.frameStyle}&frameWidth=${cartItem.frameWidth}`
    if (cartItem.matWidth >= 0) {
        link += `&matColor=${cartItem.matColor}&matWidth=${cartItem.matWidth}`;
    }
    return link;
}