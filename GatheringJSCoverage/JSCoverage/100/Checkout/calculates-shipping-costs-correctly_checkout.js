import {retrieveJson, fetchJsonFromAPI} from './cache.js';
import {calculatePrice} from "./frame.js";

let countrylist = [];

let subTotal = 0;

document.addEventListener('DOMContentLoaded', event => {

    loadCountries();
    getSubtotal();
});

async function loadCountries() {
    const countries = await getCountries();


    var sel = document.getElementById('country');


    for (let country of countries) {
        var opt = document.createElement('option');
        opt.innerHTML = country.displayName;
        opt.value = country.country;
        countrylist.push(country);
        sel.appendChild(opt);
    }

    sel.addEventListener("change", calculateTotals);
    calculateTotals();
}


async function getSubtotal() {
    subTotal = 0;
    try {
        let jsonItems = window.localStorage.getItem('cart');
        const elements = JSON.parse(jsonItems);
        if (elements.length === 0 || !elements) 
        for (let e of elements) {
            subTotal += calculatePrice(e.printSize, e.frameStyle, e.frameWidth, e.matWidth);
        }

    } 
    document.getElementById("price-subtotal").textContent = subTotal;
}


async function getCountries() {
    const response = await fetch("https://web-engineering.big.tuwien.ac.at/s20/a2/shipping");
    const data = await response.json();
    if (data.destinations == 0) 
    const countries = data.destinations.splice(0, 100);
    return countries;

}

function calculateTotals() {
    var selectedCountryName = document.getElementById('country').value;
    var selectedCountry = [];

    for (let country of countrylist) {
        if (selectedCountryName === country.country) {
            selectedCountry = country;
        }
    }

    var shippingcost = (selectedCountry.cost / 100);


    document.getElementById("price-shipping").textContent = shippingcost.toFixed(2);

    if (subTotal === 0) 


    var total = subTotal + shippingcost;


    document.getElementById("price-total").innerText = total;
}


