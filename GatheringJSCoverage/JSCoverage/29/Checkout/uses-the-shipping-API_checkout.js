import * as ShippingAPI from './shipping-api.js';
import * as frame from "../frame.js";

var priceSubtotal = 0.00;
var priceShipping = 0.00;
var priceTotal = 0.00;
var countries;
var shoppingCart;

//Get the available countries and associated shipping costs using the Artmart Shipping API
async function getCountries() {
    const destinations = await ShippingAPI.retrieve();
    if (!destinations) 
    return destinations;
}

function successCallback(result) {

    countries = result;

    let sElement = document.getElementById("country");
    sElement.innerHTML = "";

    for (let i = 0; i < result.length; i += 1) {
        let element = document.createElement("option");
        element.value = result[i].country;
        element.innerText = result[i].displayName;
        sElement.appendChild(element);
    }
    //get shipping costs for default value
    let event = new Event('change');
    sElement.dispatchEvent(event);
    disableButton(false);
}



function calculateSubtotal() {
    let sc = JSON.parse(shoppingCart);
    let counter = 0.00;
    let sum = 0.00;
    for (let j = 0; j < sc.length; j += 1) {
        counter = frame.calculatePrice(sc[j].printSize, sc[j].frameStyle, sc[j].frameWidth, sc[j].matWidth);
        sum += counter;
    }
    return sum;
}

document.addEventListener('DOMContentLoaded', event => {
    //While the data is loading, or in case there was an error,
    //the shipping costs and total price should be replaced by an em-dash (i.e. € —) and the pay button should be disabled.
    emDash();
    disableButton(true);
    //The pay button doesn't have to do anything
    document.querySelector("#pay-button").addEventListener("click", , false);

    //If there are no items in the shopping cart, the user should be redirected to the empty shopping cart page
    shoppingCart = localStorage.getItem("cart");
    if (!shoppingCart)  else {
        priceSubtotal = calculateSubtotal();
        let priceSubtotalElement = document.getElementById("price-subtotal");
        priceSubtotalElement.innerText = priceSubtotal.toFixed(2);
    }

    const promise = getCountries();
    promise.then(successCallback, failureCallback);

});

function emDash() {
    let shippingCostElement = document.getElementById("price-shipping");
    shippingCostElement.innerText = "\u2014";
    let totalElement = document.getElementById("price-total");
    totalElement.innerText = "\u2014";
}

function disableButton(bool) {
    let payButton = document.getElementById("pay-button");
    payButton.disabled = bool;
}

var selectElement = document.getElementById("country");
selectElement.addEventListener('change', event => {

    let country = document.getElementById("country").value;
    for (let j = 0; j < countries.length; j += 1) {
        if (countries[j].country === country) {
            priceShipping = countries[j].cost / 100;
            break;
        }
    }
    //show shipping costs
    let shippingCostElement = document.getElementById("price-shipping");
    shippingCostElement.innerText = priceShipping.toFixed(2);
    //show total costs
    let priceTotalElement = document.getElementById("price-total");
    priceTotal = priceSubtotal + priceShipping;
    priceTotalElement.innerText = priceTotal.toFixed(2);
});
