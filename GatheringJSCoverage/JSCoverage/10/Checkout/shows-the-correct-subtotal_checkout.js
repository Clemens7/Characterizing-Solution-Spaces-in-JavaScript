import * as CartCache from "./cart-cache.js";
import {calculatePrice} from "./frame.js";

let cart = null;
let subtotal = 0;
let destinations = [];
const select = document.getElementById("country");

window.addEventListener("DOMContentLoaded", async function load(event) {
        cart = CartCache.retrieveCart();
        if (!cart) 
        calcSubtotal();
        fillPrices(subtotal, "price-subtotal");
        fillPrices(subtotal, "price-total");
        await retrieveCountries();
        await addCountriesToSelect();
    },
    false
);

select.addEventListener("change", );

function calcSubtotal() {
    for (let i = 0; i < cart.length; i++) {
        subtotal += parseFloat(calculatePrice(cart[i].printSize, cart[i].frameStyle, cart[i].frameWidth, cart[i].matWidth));
        console.log(subtotal.toString());
    }
    console.log(subtotal);
}

const addCountriesToSelect = async () => {
    for (let i = 0; i < destinations.length; i++) {
        const optionElement = document.createElement('option');
        optionElement.value = destinations[i].country;
        optionElement.id = destinations[i].cost;
        optionElement.innerText = destinations[i].displayName;
        select.appendChild(optionElement);
    }
    select.selectedIndex = -1;
}

function fillPrices(price, id) {
    document.getElementById(id).innerText = price.toFixed(2);
}

const BASE_URL = "https://web-engineering.big.tuwien.ac.at/s20/a2/";
const retrieveCountries = async () => {
    const response = await fetch(`${BASE_URL}shipping`).catch()
    const jsonResponse = await response.json();
    destinations = jsonResponse.destinations;
};

const disablePrices = 
