import * as DOM from './domHelper.js'
import {calculatePrice, render} from "./frame.js";
import {getOneArtworkByID} from "./searchService.js";
import {Artwork} from "./artwork.js";
import {displayCartCount} from "./main.js";


const cart = "cart";

document.addEventListener("DOMContentLoaded", () => {
    let items = JSON.parse(window.localStorage.getItem(cart));

    let sCart = document.getElementById(cart);
    // pageLoad(items, sCart).then(() => {
    //     if (items == null) {
    //         sCart.appendChild(createCheckoutBtnDom(true, items));
    //     } else {
    //         sCart.appendChild(createCheckoutBtnDom(false, items))
    //     }
    // });
    pageLoad(items, sCart);
    displayCartCount();
});

async function pageLoad(items, sCart) {

    if (items == null) {

        sCart.appendChild(createCheckoutBtnDom(true, items))

    }
}



function createCheckoutBtnDom(state, items) {
    if (state) {
        return DOM.container([
            DOM.container([
                DOM.textElementWithoutclass('There are no items in your shopping cart.', 'span', 'price-total')
            ], 'div', 'price'),
            DOM.btnCheckout('button', 'button', 'checkout-button', state)
        ], 'div', 'cart-total')
    }
}





