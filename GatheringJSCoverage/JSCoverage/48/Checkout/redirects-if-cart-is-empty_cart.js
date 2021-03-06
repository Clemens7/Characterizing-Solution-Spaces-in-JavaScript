import StorageHandler from './storage-handler.js';
import {getPrintSizes, calculatePrice, render} from "./frame.js";
import {} from "./config.js";
import {API} from "./api.js";
let IDs = [];

window.onload = function() {
    console.log("cart loaded");
    showItemsDynamically();
    enableCheckout();
    getIDs();
    displayAll(IDs).then(() => {
        renderFrames();
        addCancel();
        displayTotal();
    });



};



async function displayAll(IDs) {
    const cart = document.getElementById("cart");
    if (IDs.length === 0) {
        cart.prepend(await dynamicItems("empty"));
    }

    for (let i = 0; i < IDs.length; i++) 
}

async function dynamicItems(itemID) {
    const structure = document.createElement("div");

    if (itemID !== "empty")  else {
        structure.innerHTML = `
        <div class="museum-label">
          <div>
            <span class="artist"></span>
            <span class="title"></span>
            <span class="date">There are no items in your shopping cart.</span>
            <br><br>
          </div>
          <div class="cart-price"> <span id="price-0"></span></div>
        `;

        disableCheckout();
    }


    return structure;

}

export function showItemsDynamically() {
    const cart = document.getElementById("cart-link");

    cart.innerText = "Cart (" + StorageHandler.getCartSize() + ")";

    return cart;
}

function disableCheckout(){
    const button = document.getElementById("checkout-button");
    button.disabled = true;
}

function enableCheckout() {
    const button = document.getElementById("checkout-button");
    button.disabled = false;
}

function displayTotal() {
    const price_total = document.getElementById("price-total");
    let total = 0;
    for (let i = 0; i < IDs.length; i++) 
    let help = total.toString().split(".");
    if (help[1] !== undefined )  else {
        price_total.innerHTML =`${total}`;
    }
    return price_total;
}

function renderFrames() {
    for (let i = 0; i < IDs.length; i++) }


function getIDs() {
    IDs = StorageHandler.readCart();
}

async function addCancel() {
    const cancel = [];
        for (let i = 0; i < IDs.length; i++) }
