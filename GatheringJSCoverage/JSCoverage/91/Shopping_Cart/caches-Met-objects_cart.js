import { Artwork } from "./artwork.js";
import { render, calculatePrice } from "./frame.js";
import * as artworkCache from './artwork-cache.js';

renderCart();

function renderCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) ;

    Promise.all(cart.map((cartItem) => {
        return new Promise((resolve, reject) => {
            let artworkData = artworkCache.retrieve(cartItem.objectID);
            if (artworkData !== undefined) {
                resolve({ artworkData, cartData: cartItem });
            }
        });
    })).then((data) => {
        let insertStrings = data.map(({ artworkData, cartData }, index) => {
            let configLink = './config.html'
                + '?objectID=' + cartData.objectID
                + '&printSize=' + cartData.printSize
                + '&frameStyle=' + cartData.frameStyle
                + '&frameWidth=' + cartData.frameWidth
                + '&matColor=' + cartData.matColor
                + '&matWidth=' + cartData.matWidth;

            let frameSizeText;
            switch (cartData.printSize) {
                case 'S': frameSizeText = 'Small'; break;
                case 'M': frameSizeText = 'Medium'; break;
                
            }

            let frameDescription = `${frameSizeText} print in a ${cartData.frameWidth / 10} cm ${cartData.frameStyle} frame${cartData.matWidth != '0' ? ` with a ${cartData.matWidth / 10} cm ${cartData.matColor} mat` }.`;

            let price = calculatePrice(
                cartData.printSize,
                cartData.frameStyle,
                cartData.frameWidth,
                cartData.matWidth
            );

            return `
<div class="cart-item">
  <div class="cart-preview" id="preview-container-${index}">
    <a href="${configLink}">
      <img class="cart-thumb" src="${artworkData.image}" id="preview-${index}" alt="${artworkData.title}">
    </a>
  </div>
  <div class="museum-label">
    <div>
      <span class="artist">${artworkData.artist}</span>
      <span class="title">${artworkData.title}</span>,
      <span class="date">${artworkData.date}</span>
      <br><br>
      <span class="frame-description">${frameDescription}</span>
    </div>
    <div class="cart-price">€ <span id="price-${index}">${price}</span></div>
    <button type="button" class="cart-remove" id="remove-button-${index}"></button>
  </div>
</div>`;
        });

        let totalPrice = 0;
        data.forEach(({ cartData }) => {
            totalPrice += calculatePrice(
                cartData.printSize,
                cartData.frameStyle,
                cartData.frameWidth,
                cartData.matWidth
            );
        });

        document.getElementById('cart').innerHTML = insertStrings.join('\n') +
        `${cart.length === 0  : ''}
        <div class="cart-total">
            <div class="price">Total: € <span id="price-total">${totalPrice.toFixed(2)}</span></div>
            <button type="button" id="checkout-button" href="checkout.html" ${cart.length === 0  : ''}>Checkout</button>
        </div>`;


        data.forEach(({ cartData }, index) => {
            document.getElementById('remove-button-' + index).addEventListener('click', );
            render(
                document.getElementById('preview-' + index),
                document.getElementById('preview-container-' + index),
                cartData.printSize,
                cartData.frameStyle,
                cartData.frameWidth,
                cartData.matColor,
                cartData.matWidth
            );
        });

        document.getElementById('checkout-button').addEventListener('click', );
    });
}


