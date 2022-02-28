import * as Frame from './frame.js'
import {getArtworkById} from "./metArtwork.js";
import * as DOM from "./domElementHelper.js"

export function startPage() {
    let cart = getCart();

    if (cart.length === 0) {
        emptyCart();
    }
}

/**
 * This function will set the values of the not-generated DOM-elements, if the cart is empty
 */
function emptyCart() {
    const cart = getCart();
    const cartElement = document.getElementById("cart");
    const infoText = document.createElement("h2");
    infoText.innerText = "There are no items in your shopping cart.";


    if (!cart)  else if (cart.length === 0) {
        cartElement.insertBefore(infoText, cartElement.firstChild);
        document.getElementById("checkout-button").disabled = true;
    }

    document.getElementById("price-total").innerText = calcSum();
    document.getElementById("cart-link").innerText = getCartText();
}

/**
 * This function is used when the cart isn't empty. It will generate the whole cart.
 * If the cart is empty, it will log an error and stop executing.
 */


/**
 * This function will fetch the artwork and generate the cart-item.
 * @param storageItem which is an array-entry from the localStorage cart
 * @param index is used to make the ids unique
 */
export 

/**
 * This function will create and put the whole cart-item into the DOM
 * @param storageItem which is an array-entry from the localStorage cart
 * @param artwork from the API
 * @param index is used to make the ids unique
 */






/**
 * This function will return the parameters of the frame, so the frame-configuration opens with the right
 *  frame
 * @param storageItem with the saved frame-properties
 * @returns {string} the sub-link for the frame-configuration
 */


export function getCartText() {
    let cart = JSON.parse(localStorage.getItem("cart"));

    if (!cart)  else if (cart.length === 0) {
        return "Cart"
    }}









/**
 * This function return the price of the given item
 * @param storageItem with the needed parameters to calculate the price
 * @returns {number} the right calculated price
 */


/**
 *
 * @param storageItem the item from the localStorage
 * @param cartItem the DOM-element which should be deleted
 * @returns {HTMLButtonElement} the button with the onclick-event
 */




/**
 * This function determines whether the objects are the same or not.
 * Is generally used to know if the item was found in a loop
 * @param cartItem which is compared to the other item
 * @param storageItem which is compared to the other tiem
 * @returns {boolean} true if every value is the same, false otherwise
 */


/**
 * Returns the full description for the museum label
 * @param storageItem which has the properties to determine the description
 * @returns {string} The full description of storageItem
 */




/**
 * This function will add the given product to the localStorage
 * @param product to add to the localStorage
 */
export 

/**
 * This function will return the cart from the localStorage.
 * @returns {any} An array which is empty or the saved cart from the localStorage
 */
export function getCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart)
    return cart;
}

/**
 *
 * @returns {string}
 */
export function calcSum() {
    let cart = getCart();
    let sum = 0;
    cart.forEach();
    return sum.toFixed(2);
}