import * as DOM from './dom-helpers.js';
import * as FRAME from '../frame.js';
import * as COMMONS from "./commons.js";

let cartItems = [];

window.onload = function WindowLoad() {
    cartItems = COMMONS.retrieveCartFromCache();
    if (cartItems.length > 0) {
        Promise.all(
            cartItems.map(async (e) => {
                let imgMeta = JSON.parse(localStorage.getItem(e.objectID));
                if (!imgMeta) 
                let itemPrice = FRAME.calculatePrice(e.printSize, e.frameStyle, e.frameWidth, e.matWidth);
                addCartItemToCart(imgMeta, e, itemPrice.toFixed(2));
                let img = document.getElementById(`preview-${imgMeta.objectID}`);
                let container = document.getElementById(`preview-container-${imgMeta.objectID}`);
                FRAME.render(img, container, e.printSize, e.frameStyle, e.frameWidth, e.matColor, e.matWidth);
                removeButtonAttachDeleteListener();
            })
        );
        COMMONS.storeCartInCache(cartItems);
    }
    attachTotalPrice();
    showHeaderNoItems();
    attachButtonCheckoutNavigation();
}

function addCartItemToCart(imgMeta, cartItem, price) {
    const cart = document.getElementById('cart');
    cart.insertBefore(createCartItem(imgMeta, cartItem, price), cart.firstChild);
}

function createCartItem(meta, item, price) {
    let configuration = rawDescriptionsToText(item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth);
    let hrefToConfig = `config.html?objectID=${meta.objectID}&printSize=${item.printSize}&frameStyle=${item.frameStyle}`;
    hrefToConfig = hrefToConfig.concat(`&frameWidth=${item.frameWidth}&matColor=${item.matColor}&matWidth=${item.matWidth}`);

    localStorage.setItem(meta.objectID, JSON.stringify(meta));
    return DOM.setAttributes(DOM.container([DOM.setAttributes(DOM.container([DOM.setAttributes(
        DOM.container([DOM.setAttributes(document.createElement('img'), {
            className: 'cart-thumb', src: meta.primaryImageSmall, id: `preview-${meta.objectID}`,
            alt: 'The picture ' + meta.title
        })], 'a'), {href: `${hrefToConfig}`})]), {
        className: 'cart-preview', id: `preview-container-${meta.objectID}`
    }),
        DOM.setAttributes(DOM.container([DOM.container([DOM.setAttributes(DOM.textElement('span', meta.artistDisplayName),
            {className: 'artist'}), DOM.setAttributes(DOM.textElement('span', meta.title + ', '),
            {className: 'title'}), DOM.setAttributes(DOM.textElement('span', meta.objectDate),
            {className: 'date'}), DOM.textElement('br', ''), DOM.textElement('br', ''),
                DOM.setAttributes(DOM.textElement('span', configuration), {className: 'frame-description'})]),
                DOM.setAttributes(DOM.container([DOM.setAttributes(DOM.textElement('span', '€ ' + price),
                    {id: `price-${meta.objectID}`})]), {className: 'cart-price'}), DOM.setAttributes(
                DOM.container([], 'button'), {className: 'cart-remove', id: `remove-${meta.objectID}`})]),
            {className: 'museum-label'}),]), {className: 'cart-item'});
}

function rawDescriptionsToText(printSize, frameStyle, frameWidth, matColor, matWidth) {
    let description = '';
    switch (printSize) {
        case "S": description = description.concat('Small'); break;
        case "M": description = description.concat('Medium'); break;
         }
    description = description.concat(' print in a');
    frameWidth > 0 ? description = description.concat(` ${frameWidth / 10} cm`) ;
    description = description.concat(` ${frameStyle} frame`);
    matWidth > 0 ? description = description.concat(` with a ${matWidth / 10} cm ${matColor} mat`) ;
    return description.concat('.');
}

function removeButtonAttachDeleteListener() {
    let removeButtons = document.getElementsByClassName('cart-remove');
    for (let button of removeButtons) {
        button.onclick = 
    }
}

function attachTotalPrice() {
    let priceTotal = 0;
    for (const item of cartItems) {
        priceTotal += FRAME.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth) * 100;
    }
    document.getElementById('price-total').innerText = (priceTotal / 100).toFixed(2);
}

function showHeaderNoItems() {
    if (COMMONS.showCartItemsNumber() === 0) 
}



function attachButtonCheckoutNavigation() {
    document.getElementById('checkout-button').onclick = 
}