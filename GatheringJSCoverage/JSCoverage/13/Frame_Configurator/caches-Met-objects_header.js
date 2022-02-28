import { Cart } from "./cart-service.js";
export function updateCartCount(cart) {
    if (cart.size == 0) {
        document.getElementById("cart-link").innerText = "Cart";
    }
}
updateCartCount(new Cart());
