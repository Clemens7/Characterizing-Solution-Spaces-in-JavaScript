import { Artwork } from "./artwork.js";
import { calculatePrice } from "./frame.js";
import { render } from "./frame.js";
import { updateCartItemsNumber } from "./cart-numbers.js";


window.addEventListener('storage', );

displayItems();



function displayItems() {
    let cart = [];
    if (localStorage.getItem("cart") !== null)  else {
        cartNull();
    }

    if (cart.length !== 0)  else {
        cartNull();
    }
}

function cartNull() {
    if (document.getElementById('h2') == null) {
        const noItems = document.createElement('h2');
        noItems.id = 'h2';
        noItems.innerText = "There are no items in your shopping cart.";
        document.getElementById('cart').insertAdjacentElement("afterbegin", noItems);
        document.getElementById('checkout-button').disabled = true;
    }
}












