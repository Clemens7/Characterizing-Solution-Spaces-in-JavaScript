import {updateCartNavigationItemCount} from "./common.js";

export 

export function removeFromCart(cartId) {
    let cart = readCart();
    if (cart.length === 1)  else {
        cart.splice(cartId, 1);
    }
    writeCart(cart);
}

export function readCart() {
    let cart = localStorage.getItem('cart');
    if (!cart) 
    return JSON.parse(cart);
}

export function writeCart(cart) {
    updateCartNavigationItemCount(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
}

export class CartObject {
    
}