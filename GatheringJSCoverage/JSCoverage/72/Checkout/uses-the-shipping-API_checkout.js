import { calculatePrice } from './frame.js';

const artmartshippingAPI = "https://web-engineering.big.tuwien.ac.at/s20/a2";
let destinations;

async function getAvailableCountries() {
    document.getElementById('pay-button').disabled = true;

    let response = await fetch(`${artmartshippingAPI}/shipping`);
    let json = await response.json();
    destinations = await json.destinations;
    createCountries(destinations);

    document.getElementById('pay-button').disabled = false;
}


function createCountries(countryArray) {
    let element = document.getElementById('country');

    for (let i=0; i<countryArray.length; i++) {
        element.innerHTML += `
        <option value="${countryArray[i].country}" name="${countryArray[i].country}" id="${countryArray[i].country}">${countryArray[i].displayName}</option>
        `;
    }

    // set the initial price
    setShippingPrice();
    element.addEventListener('change', )
}

function setShippingPrice() {
    let element = document.getElementById('country');
    let shippingCost = destinations[element.selectedIndex].cost / 100;
    document.getElementById('price-shipping').innerHTML = shippingCost.toFixed(2);
    document.getElementById('price-total').innerHTML = (shippingCost + price).toFixed(2);
}

let cartItems = JSON.parse(localStorage.getItem('cart'));

if (cartItems == null || cartItems === []) 

let price = 0;
for (let cartItem of cartItems) {
    price += calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth);
}

document.getElementById('price-subtotal').innerText = price;

getAvailableCountries();