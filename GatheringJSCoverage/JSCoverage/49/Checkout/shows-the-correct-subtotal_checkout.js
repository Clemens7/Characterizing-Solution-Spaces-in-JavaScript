import * as cartStore from './cartStore.js'
import * as frame from './frame.js'

const API_URL = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';
let shippingDestCosts;

export function checkIfCartIsEmpty() {
    if (cartStore.getNumberOfObjectsInCart() === 0) 
}

export async function initDestinations() {
    shippingDestCosts = await retrieveShippingDataFromAPI();

    if (!shippingDestCosts) 

    let countrySelection = document.getElementById('country');

    for (let shippingDestCost of shippingDestCosts) {
        const element = document.createElement('option');
        element.value = shippingDestCost.country;
        element.innerText = shippingDestCost.displayName;
        countrySelection.appendChild(element);
    }
    showShippingCostForSelectedDestination();
}

export function calculateAndSetSubtotal() {
    let subtotalPrice = calculateSubtotal()

    if (subtotalPrice !== 0) {
        document.getElementById('price-subtotal').innerHTML = subtotalPrice.toFixed(2);
    }
}

function calculateSubtotal() {
    let cartObjects = cartStore.getObjectsFromCart();
    let subtotalPrice = 0;

    for (let cartObject of cartObjects) {
        subtotalPrice += frame.calculatePrice(cartObject.printSize, cartObject.frameStyle, cartObject.frameWidth, cartObject.matWidth);
    }

    return subtotalPrice;
}

export function calculateAndSetTotalPrice() {
    let subtotalPrice = calculateSubtotal();
    let shippingCosts = calculateShippingCosts();
    if (subtotalPrice !== 0 && shippingCosts !== 0) {
        let totalPrice = subtotalPrice + shippingCosts;

        document.getElementById('price-total').innerText = totalPrice.toFixed(2);
    }
}

async function retrieveShippingDataFromAPI() {
    try {
        const response = await fetch(API_URL);
        const rawData = await response.json();
        return rawData.destinations;
    }}

export function showShippingCostForSelectedDestination() {

    let shippingCosts = calculateShippingCosts()
    document.getElementById('price-shipping').innerText = shippingCosts.toFixed(2);
}

function calculateShippingCosts() {
    let selectedValue =  document.getElementById('country').value;
    let shippingDestCost = shippingDestCosts.filter(s => s.country === selectedValue)[0];

    return shippingDestCost.cost/100;
}


