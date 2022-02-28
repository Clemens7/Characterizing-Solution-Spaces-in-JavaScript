import * as SHIPPING_API from './shipping-api.js';
import * as SHIPPING_CACHE from './shipping-cache.js';
import {calculatePrice} from './frame.js';
import * as DOM from './dom-helpers.js';

const cart = JSON.parse(localStorage.getItem('cart')) ;
const countrySelector = document.getElementById('country');
const totalPrice = document.getElementById('price-total');
const subtotalPrice = document.getElementById('price-subtotal');
const shippingPrice = document.getElementById('price-shipping');

countrySelector.addEventListener('input', );

document.addEventListener('DOMContentLoaded', async () => {
    if (!cart || cart.length < 1) 
    const fetchCountry = fetchCountryData();
    setSubtotalPrice();
    await fetchCountry;
    setShippingPrice();
    setTotalPrice();
});

const setTotalPrice = () => {
    const payButton = document.getElementById('pay-button');
    const sub = Number.parseFloat(subtotalPrice.innerHTML);
    const ship = Number.parseFloat(shippingPrice.innerHTML);
    totalPrice.innerHTML = isNaN(sub) || isNaN(ship)  :
        (Math.round((sub + ship) * 100) / 100).toFixed(2);
    payButton.disabled = isNaN(Number.parseFloat(totalPrice.innerHTML));
};

const setSubtotalPrice = () => {
    let price = 0;
    for (const item of cart) {
        price += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    }
    subtotalPrice.innerHTML = (Math.round(price * 100) / 100).toFixed(2);
};

const setShippingPrice = () => {
    const destinations = SHIPPING_CACHE.fetchDestinations();
    let shippingCost = destinations[countrySelector.value].cost ;
    shippingPrice.innerHTML = !shippingCost  :
        (Math.round((shippingCost / 100) * 100) / 100).toFixed(2);
};

const fetchCountryData = async () => {
    await SHIPPING_API.fetchShippingData();
    const destinations = SHIPPING_CACHE.fetchDestinations();
    if (!destinations) 
    for (let c in destinations) {
        countrySelector.appendChild(
            DOM.setAttributes(DOM.textElement('option', destinations[c].displayName), {value: c}));
    }
};
