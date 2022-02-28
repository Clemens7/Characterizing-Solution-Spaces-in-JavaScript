import { ConfiguredFrameRepository } from "./repository/ConfiguredFrameRepository.js";
import { calculatePrice } from "./frame.js";
const ARTMART_SHIPPING_API = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';
const checkoutForm = document.getElementById("checkout-form");
const contactEmail = document.getElementById("email");
const shippingName = document.getElementById("name");
const shippingAddress = document.getElementById("address");
const shippingCity = document.getElementById("city");
const shippingCountry = document.getElementById("country");
const shippingPostalCode = document.getElementById("postalcode");
const shippingPhone = document.getElementById("phone");
const cardHolder = document.getElementById("cardholder");
const cardNumber = document.getElementById("cardnumber");
const cardExpiry = document.getElementById("cardexpiry");
const cardCVC = document.getElementById("cardcvc");
const priceSubtotal = document.getElementById("price-subtotal");
const priceShipping = document.getElementById("price-shipping");
const priceTotal = document.getElementById("price-total");
const payButton = document.getElementById("pay-button");
document.addEventListener('DOMContentLoaded', () => { returnToCart(); });
document.addEventListener('DOMContentLoaded', () => { getCartSubtotal(); });
document.addEventListener('DOMContentLoaded', () => { getShippingInformation(ARTMART_SHIPPING_API); });
shippingCountry.addEventListener('change', event => { getShippingPrice(); });
shippingCountry.addEventListener('change', event => { getTotalPrice(); });
payButton.addEventListener('click', );
/**
 * Redirects the user back to the shopping cart page if the cart is empty.
 */
export function returnToCart() {
    let cfp = new ConfiguredFrameRepository();
    if (cfp.getAllFrames().length === 0) 
}
/**
 * Show the subtotal for all items in the shopping cart. The shopping cart is retrieved from localStorage.
 *
 * @returns subtotal The combined price of all items currently in the shopping cart.
 */
export function getCartSubtotal() {
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    let subtotal = 0.0;
    for (const item of cart) {
        subtotal += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    }
    priceSubtotal.innerText = String(subtotal);
    return subtotal;
}
/**
 * Get the available countries and associated shipping costs using the Artmart Shipping API, fill out the available
 * countries in the respective checkout form field and store the full shipping information in local storage.
 *
 * While the data is loading, or in case there was an error, the shipping costs and total price are replaced by
 * an em-dash (i.e. € —) and the pay button is disabled.
 *
 * @return destinations an object containing an list of countries as an array of objects containing each the country code,
 * the full country name and the shipping cost in € cents. Example:
 *
 * { "destinations" : [
 *     { "country" : "ES", "displayName" : "Spain", "cost" : 1303 },
 *     { "country" : "JA", "displayName" : "Jamaica", "cost" : 420 },
 *     { "country" : "US", "displayName" : "United States of America", "cost" : 666 },
 * ]}
 */
export function getShippingInformation(API_URL) {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
        for (let i = 0; i < data.destinations.length; i++) {
            shippingCountry.innerHTML += `<option value="${data.destinations[i]["country"]}">${data.destinations[i]["displayName"]}</option>`;
        }
        return data;
    })
        .then(data => {
        localStorage.setItem("destinations", JSON.stringify(data));
        return data;
    })
        .then(data => {
        getShippingPrice();
        return data;
    })
        .then(data => {
        getTotalPrice();
        return data;
    })
        .catch();
}
/**
 * Calculate the shipping cost for the selected country. The list of shipping destinations is
 * retrieved from localStorage.
 *
 * @returns shipping Number containing the shipping cost in €
 */
export function getShippingPrice() {
    let shipping = 0.0;
    let destinations = JSON.parse(localStorage.getItem("destinations")).destinations;
    if (destinations !== undefined && destinations[0].hasOwnProperty("country")) {
        for (let i = 0; i < destinations.length; i++) {
            if (destinations[i].country === shippingCountry.value) {
                let shipping = (destinations[i].cost / 100).toFixed(2);
                priceShipping.innerText = String(shipping);
                return shipping;
            }
        }
}
/**
 * Calculate the total price including shipping costs for the selected country.
 *
 * @returns total Number containing the total price in €
 */
export function getTotalPrice() {
    let total = 0.0;
    total = Number(getCartSubtotal()) + Number(getShippingPrice());
    priceTotal.innerText = String(total);
    return total;
}
/**
 * The pay button doesn't have to do anything. We made it sing an old folk song from yesteryear...
 */
export 
/**
 * Toggle the Pay button on or off.
 *
 * @param disabled Boolean value indicating if the button should get disabled (true) or not (false).
 */

