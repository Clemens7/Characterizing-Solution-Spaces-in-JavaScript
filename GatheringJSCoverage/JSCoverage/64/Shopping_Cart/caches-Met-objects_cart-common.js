import {calculatePrice} from "../frame.js";

export function displayCartContent() {
    let cart;
    try {
        const cartString = localStorage.cart ;
        cart = JSON.parse(cartString);
    } 
    let cartLink = document.getElementById('cart-link');
    cartLink.innerText = 'Cart'
    if (cart.length !== 0) {
        cartLink.innerText += ` (${cart.length})`
    }
}

export function calculateTotal() {
    let cart;
    try {
        const cartString = localStorage.cart ;
        cart = JSON.parse(cartString);
    } 
    let total = 0.00;
    for (let item of cart) {
        let n = parseFloat(calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth).toFixed(2));
        if (!Number.isNaN(n)) {
            total += n;
        }
    }
    return total.toFixed(2).toString();
}