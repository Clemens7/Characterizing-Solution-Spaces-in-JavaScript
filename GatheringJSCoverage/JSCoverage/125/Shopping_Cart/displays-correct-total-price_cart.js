import * as CartCache from "./cart-cache.js";
import {updateHeaderCartItemCount} from "./cart-dom.js";
import {calculatePrice, render} from "./frame.js";
import * as ArtCache from "./art-cache.js";
import * as ArtAPI from "./art-api.js"
//import {retrieve} from "./art-api";

// TODO: remove test buttons

document.getElementById('test-add').addEventListener('click', );
document.getElementById('test-clear').addEventListener('click', );
document.getElementById('test-update').addEventListener('click', );

/*
 * Page modification
 */

document.addEventListener('DOMContentLoaded', () => updatePage());

function updatePage() {
    updateHeaderCartItemCount();
    updateCart();
}

function updateCart() {
    const cart = document.getElementById('cart')
    if (cart) {
        const cartContent = CartCache.getCartContent();

        // Find deleted items
        let cartItems = cart.getElementsByClassName('cart-item');
        let toRemove = [];
        for (const item of cartItems) 
        // Remove deleted items
        for (const item of toRemove) 

        // Add not yet present items
        cartItems = Array.from(cart.getElementsByClassName('cart-item'));
        let subTotal = 0;
        for (const item of cartContent) {
            const price = calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
            subTotal += price;
            if (!cartItems.find()) {
                ArtAPI.retrieve(item.objectID).then(art => addCartItem(cart, price, art, item));
            }
        }

        // Show message and disable checkout when no items present
        document.getElementById('cart-msg').hidden = cartContent.length > 0;
        document.getElementById('checkout-button').disabled = cartContent.length === 0;

        // Set total price
        document.getElementById('price-total').innerText = subTotal;
    }
}

function addCartItem(cart, price, art, item) {
    const cartItemTemplate = `
        <div class="cart-item" id="${item.entryUUID}">
            <div class="cart-preview" id="preview-container-${item.entryUUID}">
                <a href="./config.html?${Object.keys(item).map(key => key + '=' + item[key]).join('&')}">
                    <img class="cart-thumb" src="" id="preview-${item.entryUUID}" alt="Artwork">
                </a>
            </div>
            <div class="museum-label">
                <div>
                    <span class="artist">${art.artistDisplayName}</span>
                    <span class="title">${art.title}</span>,
                    <span class="date">${art.objectDate}</span>
                    <br><br>
                    <span class="frame-description">${printSizeToString(item.printSize)} print in a ${item.frameWidth / 10} cm ${item.frameStyle} frame${item.matWidth > 0 ? ` with a ${item.matWidth / 10} cm ${item.matColor} mat` }.</span>
                </div>
                <div class="cart-price">€ <span id="price-${item.entryUUID}">${price}</span></div>
                <button class="cart-remove" id="remove-${item.entryUUID}"/>
            </div>
        </div>
    `;
    cart.insertAdjacentHTML('afterbegin', cartItemTemplate);

    document.getElementById(`remove-${item.entryUUID}`).addEventListener('click', );

    const img = document.getElementById(`preview-${item.entryUUID}`);
    img.addEventListener('load', ev => {
        render(ev.target, document.getElementById(`preview-container-${item.entryUUID}`), item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth);
    })

    img.src = art.primaryImageSmall;
}

document.getElementById('checkout-button').addEventListener('click', );

/*
 * Helper functions
 */

function printSizeToString(printSize) {
    switch (printSize) {
        case 'S':
            return `Small`;
        
        case 'L':
            return `Large`;
        
    }
}
