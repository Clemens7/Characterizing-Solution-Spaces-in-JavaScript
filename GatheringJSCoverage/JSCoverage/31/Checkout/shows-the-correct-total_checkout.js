import {calculatePrice} from './frame.js';
import {addCartEntry, CartEntry, numberOfEntries, getAllEntries} from './cart-storage.js'; 


export class Country {
    constructor(country, displayName, cost) {
        this.country = country;
        this.displayName = displayName;
        this.cost = cost;
    }
}

let countriesData;

document.addEventListener('DOMContentLoaded', () => {
    const cartItems = getAllEntries();
   if(!cartItems || cartItems.length == 0)  

    const price = calculateSubtotal(cartItems);
    //console.log(subtotal);

    const subtotal = document.getElementById('price-subtotal');
    subtotal.innerText = price;
    subtotal.value = price;

    createOptions();

} 
);

const selectedCountry = document.getElementById('country');

selectedCountry.addEventListener('change', event => {
    const selected = document.getElementById('country');
    const shipping = document.getElementById('price-shipping');

    const shippingCost = parseFloat(countriesData.filter(country => country.country == selected.value)[0].cost) / 100;

    shipping.innerText = (shippingCost).toFixed(2);
    shipping.value = (shippingCost).toFixed(2);
    console.log(shipping.value);

    const subtotal = document.getElementById('price-subtotal');
    let totalPrice = (parseFloat(subtotal.value) + shippingCost).toFixed(2);
    console.log(totalPrice);
    const total = document.getElementById('price-total');
    total.innerText = parseFloat(totalPrice).toFixed(2);
    
}
);

export async function retrieveCountries() {
    //console.log(country);

    const response = fetch(`https://web-engineering.big.tuwien.ac.at/s20/a2/shipping`);
    return response.then(a => a.json())
    .then(a => a.destinations)
    .then(a => createCountryArray(a))
}

async function createCountryArray(results) {
    console.log(results);
    const countries = [];
    if (results == null) 
    //console.log(results.length);
    for (let i of results) {
        let current = new Country(i.country, i.displayName, i.cost);
        countries.push(current);  
    }
    return countries;
}

export function calculateSubtotal(cartItems) {
    let price = 0;
   // console.log(price);
    for (const item of cartItems) {
        price += parseFloat(calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth));
        //console.log(price);
    }
    //console.log(price);
    return price.toFixed(2);

}

function createOptions() {
    retrieveCountries().then(countries => {
        const options = document.getElementById('country');
        for (let country of countries) {
            let option = document.createElement('option');
            option.innerText = country.displayName;
            option.value = country.country;
            //console.log(option.value);
            options.appendChild(option);
        }
        countriesData = countries;
    });
}



