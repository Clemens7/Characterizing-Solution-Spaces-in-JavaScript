import {render, calculatePrice} from "./frame.js";

document.addEventListener("load", loadCartItems);
const MET_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
const EMPTY_MESSAGE = "There are no items in your shopping cart.";
let checkEmptyCartTimer;

/**
 *
 * Adds an item to the cart
 * @param objectID The objectID of the image to add.
 * @param printSize The size of the print, either 'S', 'M' or 'L'.
 * @param frameStyle The type of frame, as a string.
 * @param frameWidth The width of the frame, in millimeters.
 * @param matColor The color of the mat, as a string.
 * @param matWidth The width of the mat, in millimeters.
 */
export 

/**
 * Reloads cart items and cart size
 */
export 

/**
 * Loads the cart items and adds them to the site.
 *
 */
export 

export 

export function loadCartSize() {
    let items = JSON.parse(localStorage.getItem("cart"));
    if (!items)  else {
        document.getElementById("cart-link").innerText = "Cart (" + items.length + ")";
    }
}

export 

export 

export class CartItem {
    
}
