import {cart, Frame} from "./cart_objects.js";
import {calculatePrice, render} from "../frame.js";
import {retrieve} from "./cache.js";

async function displayCartItems() {
    const cartTotal = document.getElementsByClassName("cart-total")[0];
    const cartSection = document.getElementById("cart");
    const cartItems = cart.cartItems;

    removeGeneratedDom();

    let totalPrice = 0;
    for (let itemIndex in cartItems) 

    // cart is empty
    if (cartItems.length === 0) {
        document.getElementById("checkout-button").disabled = true;
        let p = document.createElement("p");
        p.setAttribute("id", "cart-empty");
        p.innerText = "There are no items in your shopping cart.";
        cartSection.insertBefore(p, cartTotal);
    }

    // update total price
    document.getElementById("price-total").innerText = totalPrice.toFixed(2);
    console.log("Displayed Cart");
}



function removeGeneratedDom() {
    // enable checkout button
    document.getElementById("checkout-button").disabled = false;

    // remove cart items
    let items = document.getElementsByClassName("cart-item");
    while(items[0]) 

    // remove empty cart text
    let p = document.getElementById("cart-empty");
    if (p !== null) 
    console.log("removed existing generated DOM");
}



function addLinkToCheckout() {
    let checkout = document.getElementById("checkout-button");
    checkout.onclick = ;
}

addLinkToCheckout();
displayCartItems().then(() => cart.addOnChangeEvent(displayCartItems));