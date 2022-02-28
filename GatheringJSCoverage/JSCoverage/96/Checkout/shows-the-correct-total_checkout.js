import {getCartItems} from "../util.js";
import {calculatePrice} from "../../frame.js";

var subTotalPrice = 0;
var data;
var selection = document.getElementById("country");
var btn = document.getElementById("pay-button");
var countryOptions = document.getElementById("country");

initCheckout();

function initCheckout() {
    btn.disabled = true;
    selection.addEventListener('change', calculateTotalPrice);
    const cartItems = getCartItems();
    if (cartItems.length === 0 || cartItems.length === null) 
    calculateSubTotalPrice();
    getShippingCosts();
}

function calculateSubTotalPrice() {
    const cartItems = getCartItems();
    cartItems.forEach(item => {
        subTotalPrice += parseFloat(calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth).toFixed(2));
    });
    document.getElementById("price-subtotal").innerText = subTotalPrice;
}

async function getShippingCosts() {
    const response = await fetch("https://web-engineering.big.tuwien.ac.at/s20/a2/shipping");
    data = await response.json();
    data.destinations.forEach(destination => {
        let newCountry = document.createElement("option");
        newCountry.value = destination.displayName;
        newCountry.innerText = destination.displayName;
        countryOptions.appendChild(newCountry);
    });
    calculateTotalPrice();
}

function calculateTotalPrice() {
    let selectedCountry = selection.value;
    data.destinations.forEach(destination => {
        if (destination.displayName === selectedCountry) {
            document.getElementById("price-shipping").innerText = parseFloat((destination.cost / 100)).toFixed(2);
            document.getElementById("price-total").innerText = parseFloat((subTotalPrice + (destination.cost / 100))).toFixed(2);
            btn.disabled = false;
        }
    });
}
