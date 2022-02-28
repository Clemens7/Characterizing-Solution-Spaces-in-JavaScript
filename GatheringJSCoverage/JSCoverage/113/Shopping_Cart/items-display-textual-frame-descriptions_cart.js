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
    if (cartSection) {
        cartSection.innerHTML = '';
        /* reset list of prices */
        priceList = [];

        for (const idx in cart) {
            const item = cart[idx];
            const child = await renderEntry(idx, item);
            cartSection.appendChild(child);
        }
        cartSection.appendChild(cartTotal());
    }
};

/**
 * return html node for cart item
 * @param idx
 * @param item
 * @returns {Promise<void>}
 */
const renderEntry = async (idx, item) => {
    const data = await API.fetchObjectData(item.objectID);
    if (data) {
        return DOM.setAttributes(
            DOM.container([
                cartPreview(data, item, idx),
                museumLabel(data, item, idx)
            ], 'div'),
            {class: ['cart-item']}
        );
    }};


/**
 * construct description string
 * @param item from shoppingCart
 * @returns {string} frame description text
 */
const frameDescr = (item) => {
    /* divide width dimensions by 10, as they are stored in mm */
    let matWidth = item.matWidth / 10;
    let description = `${printSizes[item.printSize]} print in a ${item.frameWidth / 10} cm ${item.frameStyle} frame`;
    return matWidth === 0 ? `${description}.` : description + ` with a ${matWidth} cm ${item.matColor} mat.`;
};

/**
 * return museum-label node with artwork's and frame's description and price
 * @param data from api
 * @param item from shoppingCart
 * @param idx from shoppingcart, for id's
 */
const museumLabel = (data, item, idx) => {
    const artist = DOM.setAttributes(DOM.textElement('span', data.artist), {class: ["artist"]});
    const title = DOM.setAttributes(DOM.textElement('span', `${data.title}, `), {class: ["title"]});
    const date = DOM.setAttributes(DOM.textElement('span', data.year), {class: ["date"]});
    const lineBreak0 = DOM.br();
    const lineBreak1 = DOM.br();
    const frameDescription = DOM.setAttributes(DOM.textElement('span',
        frameDescr(item)
    ), {class: ["frame-description"]});
    const artDiv = DOM.container([artist, title, date, lineBreak0, lineBreak1, frameDescription], 'div');

    let artPrice = calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    const price = DOM.setAttributes(DOM.textElement('span', artPrice),
        {id: `price-${idx}`});
    priceList.unshift(artPrice);

    // todo is there a more elegant way to create a mixed node?
    const cartPrice = DOM.setAttributes(DOM.container([price], 'div'), {class: ['cart-price']});
    cartPrice.innerHTML = '€ ' + cartPrice.innerHTML;

    // remove items when button is pressed
    let cartRemove = DOM.setAttributes(document.createElement('button'), {class: ['cart-remove']});
    cartRemove.onclick = ;

    return DOM.setAttributes(DOM.container(
        [artDiv, cartPrice, cartRemove], 'div'),
        {class: ["museum-label"]});
};

/**
 * return cart-preview node, which displays artwork with chosen frame
 * @param data from api
 * @param item from shoppingCart / localStorage
 * @param idx from shoppingCart for id's
 */
const cartPreview = (data, item, idx) => {
    const previewImage = DOM.setAttributes(DOM.img(data.url),
        {class: ['cart-thumb'], id: `preview-${idx}`});

    let url = new URL('config.html', window.location.origin);
    for (let param in item) {
        url.searchParams.set(param, item[param]);
    }

    const link = DOM.setAttributes(DOM.container([previewImage],
        'a'), {href: url.toString()/*'config.html'*/});
    const container = DOM.setAttributes(
        DOM.container([link], 'div'),
        {class: ["cart-preview"], id: `preview-container-${idx}`}
    );
    previewImage.onload = () => {
        render(previewImage, container,
            item.printSize, item.frameStyle, item.frameWidth,
            item.matColor, item.matWidth);
    };
    return container;
};

/**
 * returns cart-total div, but does not change document
 */
const cartTotal = () => {

    let price, checkout;
    if (!shoppingCart || shoppingCart.length === 0)  else {
        console.log(priceList);
        // todo: round up instead of relying on toFixed?
        const priceTotal = DOM.setAttributes(DOM.textElement("span", priceList.reduce((a, b) => a + b, 0).toFixed(2)),
            {id: "price-total"});
        price = DOM.setAttributes(DOM.container([priceTotal]), {class: ['price']});
        price.innerHTML = "Total: €" + price.innerHTML;
        checkout = DOM.setAttributes(DOM.textElement("button", "Checkout"), {
            type: "button",
            id: "checkout-button"
        });
        // checkout.onclick = console.log("checkout click");
        checkout.onclick = ;
    }

    return DOM.setAttributes(DOM.container([price, checkout], "div"), {class: ["cart-total"]});
};

