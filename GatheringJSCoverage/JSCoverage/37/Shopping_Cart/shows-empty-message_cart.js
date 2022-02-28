import { fetchObject } from "./search.js";
import { render, calculatePrice} from "./frame.js";
import { cartCount } from "./config.js";


async function initCart() {
    await cartCount();

    if (!localStorage.getItem("cart")) 

    let cart = JSON.parse(localStorage.cart);
    let itemIndex = 0;
    for (let cartItem of cart) 

    updatePrice(cart);

    document.getElementById("checkout-button").onclick = 
    

}

function updatePrice(cart) {
    if (cart.length == 0) {
        document.getElementById("price-message").innerText = "There are no items in your shopping cart.";
        document.getElementById("checkout-button").disabled = true;
    }
}







export {initCart, createCartNode};