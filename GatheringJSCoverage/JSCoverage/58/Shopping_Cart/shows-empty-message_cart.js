import * as Cart from "./cart-api.js";

import * as Api from "./art-api.js";
import * as FrameUtil from "./frame.js";

let total = 0;

document.addEventListener("DOMContentLoaded", event => {
    //Cart.clearCart();
    //Cart.addToCart(new Cart.CartItem(39799, "S", "classic", 40, "ivory", 20));
    //Cart.addToCart(new Cart.CartItem(459055, "M", "elegant", 50, "wine", 0));

    Cart.showNumCartItems();
    clearCartRender();

    total = 0;
    let checkout = document.getElementById("checkout-button");

    if (Cart.cartIsEmpty()) {
        const container = document.getElementById("cart");

        const message = document.createElement("p");
        message.innerText = "There are no items in your shopping cart.";
        container.prepend(message);

        checkout.disabled = true;
    }
});



function clearCartRender() {
    const container = document.getElementById("cart");
    const items = container.getElementsByClassName("cart-item");

    while (items[0]) 
}









