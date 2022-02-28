import * as DOM from './dom-helper.js';
import {render} from "../frame.js";
import {calculatePrice} from "../frame.js";
import {getArtwork} from "../met/met-api.js";

const container = document.getElementById('cart');

document.addEventListener('DOMContentLoaded', async() => {
    if('cart' in localStorage){
        let cart = JSON.parse(localStorage["cart"]);
        if (cart.length !== 0) 
    }
});

document.getElementById("checkout-button").addEventListener("click", );





















