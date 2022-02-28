import { CART } from "./artmart-cache.js";
import * as Frame from '../frame.js';
import { Artwork } from './datastructures.js'


//redirect to cart if cart is empty
CART.init();
if (CART.isEmpty()) 
console.log("cart has item(s):");
console.log(CART.contents);

calculateSubtotal();

//api loaded -> call function to set country select options
(async function () {
    const countries = await loadCountries();
    console.log(countries);

    setCountrySelectBox(countries);

    //option has been selected -> calculate costs
    const countrySelectBox = document.getElementById("country");
    countrySelectBox.addEventListener("change", );
})();


//API
async function loadCountries() {
    const checkoutAPI_URL = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';
    try {
        const response = await fetch(checkoutAPI_URL);
        const responseDestinations = await response.json();
        return responseDestinations["destinations"];
    }}


//add country options
function setCountrySelectBox(countries) {
    const country = document.getElementById("country");
    for (let i = 0; i < countries.length; i++) {
        country.options.add(new Option(countries[i].displayName, countries[i].country));
    }
}


//calculate subtotal    
function calculateSubtotal() {
    let subtotal = 0.00;
    for (let item of CART.contents) {
        subtotal += Frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    }
    let priceSubtotal = document.getElementById("price-subtotal");
    priceSubtotal.innerHTML = subtotal.toFixed(2);
    return subtotal;
}


//calculate shipping costs when country is selected


//calculate total costs


