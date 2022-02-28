import { artService } from "./artService.js";
import { cache } from "./cache.js";
import * as domHelper from "./dom-helper.js"
import * as frame from "./frame.js"
import * as header from "./header.js"

function loadItems() {
    const cartItems = cache.getCartItems();
    if(cartItems.length > 0)
    else{
        setEmptyCartMessage();
    }
}

function setEmptyCartMessage(){
    const cart = document.getElementById("cart");
    let textNode = domHelper.textElement("div","There are no items in your shopping cart.");
    domHelper.setAttributes(textNode,{"style":"padding: 2rem;"})
    cart.prepend(textNode);

    const button = document.getElementById("checkout-button");
    button.disabled = true;
}







loadItems();