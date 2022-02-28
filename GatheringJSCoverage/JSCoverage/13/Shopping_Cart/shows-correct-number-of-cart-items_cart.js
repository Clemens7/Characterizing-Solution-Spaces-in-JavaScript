import { Cart } from "./cart-service.js";
import { updateCartCount } from "./header.js";
var cart = new Cart;
initCart();
function initCart() {
    let cartNode = document.getElementById("cart");
    for (var i = 0; i < cart.size; i++) 
    document.getElementById("price-total").innerText = `${Number(cart.getTotalPrice).toFixed(2)}`;
    updateCheckoutButton();
}
/*
display the usual artwork information (title, artist, date) and a textual description of the configuration.
*/


function updateCheckoutButton() {
    var checkoutbutton = document.getElementById("checkout-button");
    if (cart.isEmpty) {
        checkoutbutton.disabled = true;
        generateEmptyCartText();
    }
}


function generateEmptyCartText() {
    document.getElementsByClassName("price")[0].remove();
    let cartNode = document.getElementById("cart");
    if (document.getElementById("empty") == undefined)
        
}
