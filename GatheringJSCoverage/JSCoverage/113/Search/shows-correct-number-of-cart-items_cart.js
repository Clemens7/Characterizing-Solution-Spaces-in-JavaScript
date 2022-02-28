import * as API from './met-api.js';
import {setCartQty} from './helpers.js';
// import {render, getPrintSizes, calculatePrice} from "./frame.js";
import * as DOM from "./dom-helpers.js";
import {calculatePrice, render} from "./frame.js";

export const fetchCart = () => {
    if ('cart' in localStorage) {
        return JSON.parse(localStorage['cart'])
    }
}

/**
 * onload-function
 */
document.addEventListener('DOMContentLoaded', event => {
    shoppingCart = fetchCart();
    /* construct html */
    cartItems(shoppingCart);
})

/* get array of items in cart */
const printSizes = {"S": "Small", "M": "Medium", "L": "Large"};
var priceList = [];
let shoppingCart = fetchCart();

/* add html dynamically */
/**
 * Adds html children: all cart-items and eventually the cart-total
 * @param cart
 * @returns {Promise<void>}
 */
const cartItems = async (cart) => {
    /* set number of cart items in header */
    setCartQty();
    shoppingCart = fetchCart();
    const cartSection = document.getElementById("cart");
    if (cartSection) 
};

/**
 * return html node for cart item
 * @param idx
 * @param item
 * @returns {Promise<void>}
 */
const renderEntry = ;


/**
 * construct description string
 * @param item from shoppingCart
 * @returns {string} frame description text
 */
const frameDescr = ;

/**
 * return museum-label node with artwork's and frame's description and price
 * @param data from api
 * @param item from shoppingCart
 * @param idx from shoppingcart, for id's
 */
const museumLabel = ;

/**
 * return cart-preview node, which displays artwork with chosen frame
 * @param data from api
 * @param item from shoppingCart / localStorage
 * @param idx from shoppingCart for id's
 */
const cartPreview = ;

/**
 * returns cart-total div, but does not change document
 */
const cartTotal = ;

