import {cart} from "./cart_objects.js";

function displayCartCount() {
    const count = cart.count();
    let text = "Cart";
    if (count > 0) {
        text += ` (${count})`;
    }
    document.getElementById("cart-link").innerText = text;
    console.log("refreshed Cart Count");
}

displayCartCount();
cart.addOnChangeEvent(displayCartCount);