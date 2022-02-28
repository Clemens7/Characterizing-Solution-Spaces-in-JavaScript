import {ArtAPI} from "./artCollectionApi.js";
import {render, calculatePrice} from "./frame.js";
import {createContainer, createArtworkLabel, createTextNode} from "./htmlConstructsAPI.js";

const api = new ArtAPI();
let totalPrice;


document.addEventListener('DOMContentLoaded', async() => {
    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener('click',);
    if (!localStorage.getItem('cart')) { // if no items are in the cart
        const cart = document.getElementById('cart');
        const infoMsg = document.createElement("h2");
        infoMsg.innerText = "There are no items in your shopping cart.";
        cart.prepend(infoMsg);
        checkoutButton.disabled = true;
        const totalP = document.getElementById('price-total');
        totalP.innerHTML = `0`;
        const cartLink = document.getElementById('cart-link');
        cartLink.innerHTML = 'Cart';
    }
});

// Constructs content in DOM

// gets specific frame-description of an artwork



