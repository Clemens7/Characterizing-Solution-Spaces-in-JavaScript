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
export function loadContent() {
    caches.open("artmart-cart");
    checkEmptyCart();
    loadCartItems();
    loadCartSize();
}

/**
 * Loads the cart items and adds them to the site.
 *
 */
export async function loadCartItems() {
    let itemCount = 0;
    let cart = JSON.parse(localStorage.getItem("cart"));
    let sectionCart = document.getElementById("cart");

    //checkEmptyCartTimer = setInterval(checkEmptyCart, 500);

    for (let item of cart) 

    calculateTotalPrice();

    


    


    

    

    
}

export 

export function loadCartSize() {
    let items = JSON.parse(localStorage.getItem("cart"));
    if (!items)  else {
        document.getElementById("cart-link").innerText = "Cart (" + items.length + ")";
    }
}

export function checkEmptyCart() {
    let sectionCart = document.getElementById("cart");
    if (sectionCart.children.length === 1) {
        document.getElementById("checkout-button").disabled = true;
        let divEmptyMessage = document.createElement("DIV");
        divEmptyMessage.id = "empty-cart-message";
        let spanEmptyMessage = document.createElement("SPAN");
        spanEmptyMessage.innerText = EMPTY_MESSAGE;
        divEmptyMessage.appendChild(spanEmptyMessage);
        sectionCart.insertBefore(divEmptyMessage, sectionCart.lastElementChild);
    }
}

export function calculateTotalPrice() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let sum = 0;
    for (let item of cart) 
    document.getElementById("price-total").innerText = "" + sum;
}

export class CartItem {
    
}
