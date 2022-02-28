import {calculatePrice} from "./frame.js";

let acPrize = 0; // actual calculated prize of the shopping cart
const shippingURI = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';
let shippingCountries = [];
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('cart'))  else {
        const cart = JSON.parse(localStorage.getItem('cart'));
        for (const item of cart) {
            acPrize += parseFloat(calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth).toFixed(2));
        }
        showCosts();
    }
    showShippingCountries();
});

const select = document.getElementById('country');
select.addEventListener('change', );

// displays the costs
function showCosts(shippingCosts = 1500) {
    const subtotals = document.getElementById('price-subtotal');
    const total = document.getElementById('price-total');
    const shipping = document.getElementById('price-shipping');
    subtotals.innerHTML = `${acPrize.toFixed(2)}`;
    total.innerHTML = `${(acPrize + (shippingCosts / 100)).toFixed(2)}`;
    shipping.innerHTML = `${(shippingCosts / 100).toFixed(2)}`;
}

// loads and displays the shipping-countries
async function showShippingCountries() {
    let data = await loadShippingData();
    shippingCountries = data;
    const countriesEl = document.getElementById('country');
    for (const country of data) {
        let htmlCountry = document.createElement('option');
        htmlCountry.innerText = country['displayName'];
        htmlCountry.value = country.country;
        countriesEl.appendChild(htmlCountry);
    }
}

// loads shipping data from the API and returns an array holding the data
async function loadShippingData() {
    let response = await fetch(shippingURI)
        .catch();
    const jsonResponse = await response.json()
        .catch();
    return jsonResponse['destinations'];
}

// handles error if  API access fails

