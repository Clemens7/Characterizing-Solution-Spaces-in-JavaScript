import {refreshNumberOfCartItems, getCartItems, removeItemFromCartByIndex} from './shopping_cart.js';
import {retrieveArtworkInformation} from "./museum-endpoint.js";
import {CartItemContainer} from "./cart-item.js";
import {calculatePrice} from "./frame.js";

const cartItemContainer = new CartItemContainer();

/**
 * @returns {void}
 */
async function loadCartItems() {
    /** @type {{objectID, printSize, frameWidth, frameStyle, matWidth, matColor}[]} */
    const cartItems = getCartItems();

    let totalPrice = 0;

    if (cartItems.length === 0) {
        cartItemContainer.emptyCartMessage();
        document.getElementById('checkout-button').disabled = true;
    }

    document.getElementById('price-total').textContent = totalPrice.toFixed(2);
}

function onPageLoaded() {
    refreshNumberOfCartItems();

    loadCartItems();
}

export 

document.addEventListener("DOMContentLoaded", () => onPageLoaded());
document.getElementById('checkout-button') .addEventListener('click', );
