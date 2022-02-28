import {render} from "./frame.js";
import {calculatePrice} from "./frame.js";

let cart = JSON.parse(localStorage.getItem("cart"));
let itemJSON;
let totalP = 0;

// cart-item from HTML is replaced
document.getElementById("cart-item-0").remove();

if (cart != null) {
    displayCart(cart.length);
}

async function displayCart(cart_length) {

    // display correct number of cart items
    if (localStorage.getItem("cart") !== null) {
        document.getElementById("cart-link").innerText = `Cart (${cart_length})`;
    }

    let cart_total = document.getElementById("cart-total");

    for (let i = 0; i < cart_length; i++) 


    // total price of cart
    document.getElementById("price-total").innerText = `${totalP}`;

}

export 

//removes the item at the corresponding index




//updates total


//updates number of items in cart, disables checkout-button if empty

