import {calculatePrice} from "../frame.js";

export function displayCartContent() {
    let cart;
    try {
        const cartString = localStorage.cart ;
        cart = JSON.parse(cartString);
    } 
    let cartLink = document.getElementById('cart-link');
    cartLink.innerText = 'Cart'
    if (cart.length !== 0) 
}

export 