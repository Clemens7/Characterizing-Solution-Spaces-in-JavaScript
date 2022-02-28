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

    if (cartItems.length === 0)  else {
        for (let ci in cartItems) {
            let cartItem = cartItems[ci];
            cartItem.cartID = ci;
            let art = await retrieveArtworkInformation(cartItem.objectID);
            let objectPrice = calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth);
            totalPrice += objectPrice;
            cartItemContainer.createContainer(cartItem, art, objectPrice);
        }
        document.getElementById('checkout-button').disabled = false;
    }

    document.getElementById('price-total').textContent = totalPrice.toFixed(2);
}

function onPageLoaded() {
    refreshNumberOfCartItems();

    loadCartItems();
}

export function removeItem(id) {
    cartItemContainer.clear();
    removeItemFromCartByIndex(id);
    refreshNumberOfCartItems();
    loadCartItems();
}

document.addEventListener("DOMContentLoaded", () => onPageLoaded());
document.getElementById('checkout-button') .addEventListener('click', );
