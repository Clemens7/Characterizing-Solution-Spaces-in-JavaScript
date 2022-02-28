import { Cart } from "./cart-service.js";
export function updateCartCount(cart) {
    if (cart.size == 0) 
    else {
        document.getElementById("cart-link").innerText = `Cart (${cart.size})`;
    }
}
updateCartCount(new Cart());
