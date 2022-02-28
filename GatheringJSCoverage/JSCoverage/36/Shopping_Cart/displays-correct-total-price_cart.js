import * as DOM from './dom-helper.js';
import {render} from "../frame.js";
import {calculatePrice} from "../frame.js";
import {getArtwork} from "../met/met-api.js";

const container = document.getElementById('cart');

document.addEventListener('DOMContentLoaded', async() => {
    if('cart' in localStorage){
        let cart = JSON.parse(localStorage["cart"]);
        if (cart.length !== 0) {
            for (let item of cart) {
                let artwork = await getArtwork(item.objectID);
                addArtworkToDocument(artwork, item);
            }
            calculateTotalPrice();
            document.getElementById('cart-link').innerText = cart.length === 0  : `Cart (${cart.length})`;
        }
    }
});

document.getElementById("checkout-button").addEventListener("click", );

function addArtworkToDocument(artwork, cartItem) {
    container.insertBefore(createCartItemContainer(artwork, cartItem), container.firstChild)
}

function createCartItemContainer(artwork, cartItem) {
    let cart_preview = DOM.container([createImageContainer(artwork, cartItem)], 'div');
    cart_preview.className = 'cart-preview';
    DOM.setAttributes(cart_preview, {id: 'preview-container-' + hash(cartItem)});

    let cart_item = DOM.container([cart_preview, createLabelContainer(artwork, cartItem)], 'div');
    cart_item.className = 'cart-item';
    return cart_item;
}

function createImageContainer(artwork, cartItem) {
    let a = document.createElement('a');
    DOM.setAttributes(a, {href: `config.html?objectID=${cartItem.objectID}&printSize=${cartItem.printSize}&frameStyle=${cartItem.frameStyle}&frameWidth=${cartItem.frameWidth}&matColor=${cartItem.matColor}&matWidth=${cartItem.matWidth}`});
    let img = document.createElement('img');
    img.className = 'cart-thumb';
    DOM.setAttributes(img, {id: 'preview-' + hash(cartItem)});
    DOM.setAttributes(img, {src: artwork ? artwork.imgUrl });
    DOM.setAttributes(img, {alt: artwork ? artwork.title });

    a.appendChild(img);

    // super important!
    img.onload = function () {
        render(img, a, cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matColor, cartItem.matWidth);
    };

    return a;
}

function createLabelContainer(artwork, cartItem) {
    let museum_label = DOM.container([createDescriptionContainer(artwork, cartItem), createCartPriceContainer(artwork, cartItem), createButton(artwork, cartItem)], 'div');
    museum_label.className = 'museum-label';
    return museum_label;
}

function createButton(artwork, cartItem) {
    let button = document.createElement('button');
    button.className = 'cart-remove';

    button.addEventListener('click', );

    return button;
}

function createDescriptionContainer(artwork, cartItem) {
    let artist = DOM.textElement('span', artwork ? artwork.artist );
    artist.className = 'artist';

    let date = DOM.textElement('span', artwork ? artwork.date );
    date.className = 'date';

    let title = DOM.textElement('span', artwork ? artwork.title + (artwork.date !== "" ? ', ' ) );
    title.className = 'title';

    let text = `${printSizeToString(cartItem.printSize)} print in a ${cartItem.frameWidth / 10} cm ${cartItem.frameStyle} frame` +
        (cartItem.matWidth > 0 ? ` with a ${cartItem.matWidth / 10} cm ${cartItem.matColor} mat.` );
    let frame_description = DOM.textElement('span', text);
    frame_description.className = 'frame-description';

    return DOM.container([artist, title, date, document.createElement('br'), document.createElement('br'), frame_description], 'div');
}

function printSizeToString(printSize) {
    let name = '';
    switch (printSize) {
        case 'S':
            name = 'Small';
            break;
        
        case 'L':
            name = 'Large';
            break;
    }
    return name;
}

function createCartPriceContainer(artwork, cartItem) {
    let price = document.createElement('span');
    DOM.setAttributes(price, {id: `price-${hash(cartItem)}`});

    price.innerText = "" + calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth);

    let cart_price = document.createElement('div');
    cart_price.className = 'cart-price';
    cart_price.innerText = '€ ';
    cart_price.appendChild(price);

    return cart_price;
}

function calculateTotalPrice() {
    let total = 0;
    let prices = document.querySelectorAll('.cart-price');
    for (let price of prices) {
        total += parseFloat(price.innerText.substring(2));
    }
    let totalPriceElem = document.getElementById('price-total');
    totalPriceElem.innerText = '' + total.toFixed(2);
}



function hash(toHash) {
    let hash = 0;
    let object = JSON.stringify(toHash);
    for (let i = 0; i < object.length; i++) {
        let char = object.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}