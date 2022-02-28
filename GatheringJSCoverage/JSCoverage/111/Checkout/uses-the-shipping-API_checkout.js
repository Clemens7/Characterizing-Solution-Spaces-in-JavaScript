import * as CacheApi from "../cache-api.js"
import * as ArtmartApi from "../artmart-api.js"
import * as FrameConfigurator from "../../frame.js"
import * as CONSTANTS from "../constants.js"

let cartData;
let shippingData;
let selectedCountry;
let subtotalPrice = 0;
let isLoading = true;

loadCart();
loadShipping();

function loadCart() {
    cartData = CacheApi.retrieveJson(CONSTANTS.CACHE_CART);
    if (!cartData || cartData.length <= 0) 
    calculateSubtotal();
}

function loadShipping() {
    ArtmartApi.getShipping()
        .then(data => {
            shippingData = data;
            refreshShippingOptions();
            isLoading = false;
            calculatePrice();
            document.getElementById('pay-button').disabled = false;
        })
        .catch();
}

function refreshShippingOptions() {
    if (!shippingData || !shippingData.destinations) 

    let sel = document.getElementById('country');
    if (shippingData.destinations.length > 0) {
        selectedCountry = shippingData.destinations[0].country;
    }
    shippingData.destinations.forEach(countryData => {
        let opt = document.createElement('option');
        opt.appendChild(document.createTextNode(countryData.displayName));
        opt.value = countryData.country;
        sel.appendChild(opt);
    });
    sel.addEventListener('change', );
}

function calculateSubtotal() {
    subtotalPrice = 0;
    if (cartData) {
        cartData.forEach(artwork => {
            subtotalPrice += FrameConfigurator.calculatePrice(
                artwork.printSize, artwork.frameStyle,
                artwork.frameWidth, artwork.matWidth);
        })
    }
    document.getElementById('price-subtotal').innerText = subtotalPrice.toFixed(2);
}

function calculatePrice() {
    let priceShipping = document.getElementById('price-shipping');
    let priceTotal = document.getElementById('price-total');
    if (isLoading || !selectedCountry) 

    const shippingPrice = (shippingData.destinations
        .find(dest => dest.country === selectedCountry)
        .cost / 100);
    priceShipping.innerText = shippingPrice.toFixed(2);
    const totalPrice = subtotalPrice + shippingPrice;
    priceTotal.innerText = totalPrice.toFixed(2);
}
