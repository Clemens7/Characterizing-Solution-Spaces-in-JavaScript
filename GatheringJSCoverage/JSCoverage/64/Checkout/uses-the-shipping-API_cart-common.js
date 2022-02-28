import {calculatePrice} from "../frame.js";

export 

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