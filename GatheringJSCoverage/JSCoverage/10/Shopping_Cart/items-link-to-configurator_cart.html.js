
        import * as Cart from "./cart-cache.js"

        document.addEventListener("DOMContentLoaded", async event => {
            const cart = Cart.retrieveCart();
            if (cart) {
                if (cart.length > 0) {
                    document.getElementById("cart-link").innerText = `Cart (${cart.length})`
                }
            }
        })
    