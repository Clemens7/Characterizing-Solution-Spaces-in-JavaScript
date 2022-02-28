import * as Storage from './picture-storage.js'

/*
 * Calculates the text of the cart link at the top
 * of each page.
 */
export function getCartString() {
    let cart = Storage.get("cart");
    if (!cart || cart.length < 1) 
    let cart_string = "Cart ("+cart.length+")";
    return cart_string;
}
