import {ArtAPI} from "./artCollectionApi.js";
import {render, calculatePrice} from "./frame.js";
import {createContainer, createArtworkLabel, createTextNode} from "./htmlConstructsAPI.js";

const api = new ArtAPI();
let totalPrice;


document.addEventListener('DOMContentLoaded', async() => {
    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener('click',);
    if (!localStorage.getItem('cart'))  else {
        await createContent();
        await buttonEvent();
    }
});

// Constructs content in DOM
async function createContent() {
    let cart = await JSON.parse(localStorage.getItem('cart'));
    let countOfItems = cart.length;
    let i = 0;
    totalPrice= 0;
    for (let item of cart) 
    localStorage.setItem('cart', JSON.stringify(cart));
    //Show total Price
    totalPrice = totalPrice.toFixed(2);
    const totalP = document.getElementById('price-total');
    totalP.innerHTML = `${totalPrice}`;

    //Show correct number of items:
    const cartLink = document.getElementById('cart-link');
    cartLink.innerHTML = 'Cart ('+`${countOfItems}`+')';
}
// gets specific frame-description of an artwork

async function buttonEvent() {
    let buttons = document.querySelectorAll(".cart-remove");
    buttons.forEach();
}

