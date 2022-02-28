import * as DOM from './dom-helper.js';
import {render} from "../frame.js";
import {calculatePrice} from "../frame.js";
import {getArtwork} from "../met/met-api.js";

const container = document.getElementById('cart');

document.addEventListener('DOMContentLoaded', async() => {
    if('cart' in localStorage) else {
        whenNoItemsDisplayMessage();
    }
});

document.getElementById("checkout-button").addEventListener("click", );



















function whenNoItemsDisplayMessage() {
    let textElement = document.createElement("h2");
    textElement.innerText = 'There are no items in your shopping cart.';

    container.insertBefore(textElement, container.firstChild);
    document.getElementById('checkout-button').disabled = true;
}

