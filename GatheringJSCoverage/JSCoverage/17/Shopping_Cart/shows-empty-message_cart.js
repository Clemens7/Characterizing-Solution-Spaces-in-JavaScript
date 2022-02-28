import {calculatePrice, render} from "./frame.js";
import {getObject} from "./common.js";
import {readCart, removeFromCart} from "./cart-model.js";

export 

function checkAndSetNoItemsText() {
    let list = readCart();
    if (list.length === 0) {
        let cart = document.getElementById("cart");
        let paragraphNode = document.createElement("p");
        let h2Node = document.createElement("h2");
        let noItemsStringNode = document.createTextNode("There are no items in your shopping cart.");
        h2Node.appendChild(noItemsStringNode)
        paragraphNode.appendChild(h2Node);
        cart.insertBefore(paragraphNode, cart.firstChild);
        document.getElementById("checkout-button").disabled = true;
    }
}

export async function addCartObjectToCartView() {
    let list = readCart();
    let f = 0;

    checkAndSetNoItemsText();

    for (let i of list) 

    calculateTotal();
}

function calculateTotal() {
    let amount = 0;
    for (let item of document.getElementsByClassName("cart-price")) 
    let totalPrice = document.getElementById("price-total");
    if (totalPrice) {
        totalPrice.innerText = "" + amount.toFixed(2);
    }
}

