import { requestById } from './museumAPI.js';
import * as frame from './frame.js';
class Artwork {
    
}

let cart;

document.addEventListener('DOMContentLoaded', async event => {
    cart = parseCart();

    if (cart.length === 0){
    }

});


function parseCart() {
    let cartT = [];
    for (let n of JSON.parse(localStorage.getItem("cart"))) 
    return cartT;
}











