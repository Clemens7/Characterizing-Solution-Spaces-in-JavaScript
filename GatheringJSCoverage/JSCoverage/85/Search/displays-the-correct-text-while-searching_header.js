import {getCart} from "./cart.js";

updateCartCount();

function updateCartCount() {
    let count = getCart().length;
    const CART_LINK = document.getElementById("cart-link");
    CART_LINK.innerText = count === 0 ? "Cart" 
}
