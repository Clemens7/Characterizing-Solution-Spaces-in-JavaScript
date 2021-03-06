import { calculatePrice } from "./frame.js";

async function checkoutInit() {

    if (!localStorage.getItem("cart")) 

    setLoading();

    const countries = await getCountries();
    console.log(countries);

    if (!countries) 
    
    document.getElementById("pay-button").disabled = false;

    addCountries(countries);

    calculateTotal(countries);

    document.getElementById("country").onchange = (e) => calculateTotal(countries);
}

function setLoading() {
    document.getElementById("price-subtotal").innerHTML = "&mdash;";
    document.getElementById("price-shipping").innerHTML = "&mdash;";
    document.getElementById("price-total").innerHTML = "&mdash;";
    document.getElementById("pay-button").disabled = true;
}

async function getCountries() {
    return fetch('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping').then(
        response => response.json(),
        
    );
}

function addCountries(countries) {
    let options = ``;
    for (let country of countries.destinations) {
        console.log(country);
        options += `<option value="${country.country}">${country.displayName}</option>`;
    }
    document.getElementById("country").innerHTML = options;
}

function setSubtotalRaceconditionHack(countries) {
    let subtotal = 0;
    let cart = JSON.parse(localStorage.getItem("cart"));

    for (const item of cart) {
        subtotal += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    }

    document.getElementById("price-subtotal").innerHTML = (subtotal);
}

function calculateTotal(countries) {
	console.log("calculating total");

    let subtotal = 0;
    let selectedCountry = document.getElementById("country").value;
    let foundCountry = countries.destinations.find(country => country.country === selectedCountry);
    let shipping_price = foundCountry.cost;
    let cart = JSON.parse(localStorage.getItem("cart"));

    for (const item of cart) {
        console.log({item, price:  calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth)});
        subtotal += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    }

    document.getElementById("price-subtotal").innerHTML = (subtotal);
    document.getElementById("price-shipping").innerHTML = (shipping_price / 100).toFixed(2);
    document.getElementById("price-total").innerHTML = (subtotal + (shipping_price / 100)).toFixed(2);
    
}

export {checkoutInit, setSubtotalRaceconditionHack};
