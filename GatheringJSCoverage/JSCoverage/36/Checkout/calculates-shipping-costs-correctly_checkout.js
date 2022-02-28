import {calculatePrice} from '../frame.js';
import * as ASApi from '../artmart-shipping/artmart-shipping-api.js';

// 1. If there are no items in the shopping cart, the user should be redirected to the empty shopping cart page.
// 2. Show the subtotal for all items in the shopping cart.
// 3. Calculate the total price including shipping costs for the selected country.
// Get the available countries and associated shipping costs using the Artmart Shipping API. While the data is loading,
// or in case there was an error, the shipping costs and total price should be replaced by an em-dash (i.e. € —) and the
// pay button should be disabled.
// 4. The pay button doesn't have to do anything.

document.addEventListener('DOMContentLoaded', async () => {
        document.getElementById('pay-button').disabled = true;
        if ('cart' in localStorage) {
            calculate_subtotal_items_costs();
            await get_all_shipping_destinations();
            await calculate_shipping_costs();
            calculate_total_costs();
        }
});

let countrySelect = document.getElementById('country');
countrySelect.addEventListener('change', async () => {
    await calculate_shipping_costs();
    calculate_total_costs();
});

async function get_all_shipping_destinations() {
    let destinations = await ASApi.get_all_available_shipping_destinations();
    let countrySelect = document.getElementById('country');
    for (let destination of destinations) {
        let optionTag = document.createElement('option');
        optionTag.value = destination.country;
        optionTag.innerText = destination.displayName;
        countrySelect.appendChild(optionTag);
    }
}

function calculate_subtotal_items_costs() {
    let sum = 0;
    const cart = JSON.parse(localStorage.getItem('cart'));
    for (const item of cart) {
        let temp = calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
        if (!isNaN(temp)) {
            sum += temp;
        }
    }
    document.getElementById('price-subtotal').innerHTML = sum.toFixed(2)
}

async function calculate_shipping_costs() {
    let tag = document.getElementById('country');
    let destination = tag.options[tag.selectedIndex].value;
    document.getElementById('price-shipping').innerHTML = (await ASApi.get_shipping_cost(destination) / 100).toFixed(2);
}

function calculate_total_costs() {
    let totalCosts = 0.0;
    totalCosts += Number.parseFloat(document.getElementById('price-subtotal').innerText);
    totalCosts += Number.parseFloat(document.getElementById('price-shipping').innerText);
    document.getElementById('price-total').innerHTML = totalCosts + '';
    enable_button();
}

function enable_button() {
    if (document.getElementById('pay-button').disabled === true) {
        document.getElementById('pay-button').disabled = false;
    }
}