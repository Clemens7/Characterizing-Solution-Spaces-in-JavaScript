import {getShoppingCartFromLocalStorage} from './cart.js';
import {calculatePrice} from './frame.js';

document.addEventListener("DOMContentLoaded", redirectIfCartIsEmpty);

function redirectIfCartIsEmpty(){
    const shoppingCart = getShoppingCartFromLocalStorage();
    if(typeof shoppingCart !== typeof [] || shoppingCart.length === 0)
        
}


var countries;
var subtotalPrice = 0;

window.onload = async function() {
    
    try{
        setCountryOnClick();
        calculateSubtotal();
        await loadCountries();
        calculateShippingAndTotal();
    }
    
   
};

function calculateSubtotal() {
    const shoppingCart = getShoppingCartFromLocalStorage();
    const subtotalElement = document.getElementById('price-subtotal');
    
    for (const item of shoppingCart) {
        subtotalPrice += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    }

    subtotalElement.innerText = subtotalPrice.toFixed(2);
}

function calculateShippingAndTotal(){
    const countrySelectElement = document.getElementById('country');
    var seletedCountry = countries.find(x => x.country === countrySelectElement.value)
    const shippingElement = document.getElementById('price-shipping');
    shippingElement.innerText = (seletedCountry.cost / 100).toFixed(2);
    const totalElement = document.getElementById('price-total');
    totalElement.innerText = (subtotalPrice + seletedCountry.cost / 100).toFixed(2);
    document.getElementById('pay-button').disabled = false;
}

async function loadCountries(){
    const response =  await fetch('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping');
    countries = (await response.json()).destinations;

    const countrySelectElement = document.getElementById('country');
    for (const country of countries){
        let optionElement = document.createElement('option');
        optionElement.value = country.country;
        optionElement.innerText = country.displayName;
        countrySelectElement.appendChild(optionElement);
    }
}

function setCountryOnClick(){
    try{
        const countrySelectElement = document.getElementById('country');
        countrySelectElement.onchange = calculateShippingAndTotal;
    }
    
}

