
import {calculatePrice} from "../frame.js";
const API_SHIPPING = "https://web-engineering.big.tuwien.ac.at/s20/a2/shipping";
let destinations = {};

setSubtotal(calculateSubtotal());

getCountries().then(dest => {
    destinations = dest;
    document.getElementById('pay-button').disabled = false;

    fillDropdown();

    countryChangeListener();
    document.getElementById('country').addEventListener('change', countryChangeListener);
}).catch()

function countryChangeListener() {
    const cost = destinations[getCountry()].cost / 100;
    setShippingPrice(cost);
    setTotalPrice(cost + calculateSubtotal());
}


function setTotalPrice(newPrice) {
    document.getElementById('price-total').innerText = newPrice;

}

function setShippingPrice(newPrice){
    document.getElementById('price-shipping').innerText = newPrice.toFixed(2);
}

async function getCountries(){
    const request = await fetch(API_SHIPPING);
    const json = await request.json();
    const destinations = {};
    for (const key of json.destinations){
        const country = key.country;
        delete key.country;
        destinations[country] = key;
    }
    return destinations;
}


function fillDropdown(){
    for (let country in destinations) {
        document.getElementById('country')
            .insertAdjacentHTML('beforeend', "<option value=".concat(country, ">", destinations[country].displayName, "</option>"));
    }
}

function getCountry() {
    return document.querySelector('#country').value;
}

function setSubtotal(newValue) {
    document.getElementById('price-subtotal').innerText = newValue.toFixed(2);
}

function calculateSubtotal() {
    let subtotal = 0;
    const items = JSON.parse(localStorage.getItem('cart'));
    if (items && items.length > 0) {
        items.forEach(element => subtotal += calculatePrice(element.printSize, element.frameStyle, element.frameWidth, element.matWidth));
        console.log(subtotal);
        return subtotal;
    }
}

