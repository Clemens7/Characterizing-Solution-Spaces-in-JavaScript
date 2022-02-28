import {cart} from "./cart_objects.js";
import {calculatePrice} from "../frame.js";

var countriesShipping;
var subtotal;



function init(){

    if(cart.count() <= 0)

    update();
}



async function update(){
    const cartItems = cart.cartItems;

    subtotal = 0.00;
    for(let cartItem of cartItems){
        subtotal += calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth);
    }

    subtotal = Math.round(((subtotal) + Number.EPSILON) * 100) / 100;
    document.getElementById('price-subtotal').textContent = subtotal.toFixed(2);


    countriesShipping = await loadCountriesShipping();

    const countrySelector = document.getElementById("country");
    for(let ind = 0; ind < countriesShipping.destinations.length; ind++){

        const countryOption = document.createElement("option");
        countryOption.text = countriesShipping.destinations[ind].displayName;
        countryOption.value = countriesShipping.destinations[ind].country;
        countrySelector.add(countryOption);
    }

    updateShipping();
}



function updateShipping(){

    let selectedCountryValue = document.getElementById("country").value;
    let selectedCountry = countriesShipping.destinations.find(c => c.country === selectedCountryValue);

    let shippingCost = 1.0 * selectedCountry.cost / 100.0;
    document.getElementById('price-shipping').textContent = shippingCost.toFixed(2);

    let totalCost = (subtotal + shippingCost);
    document.getElementById('price-total').textContent = (totalCost).toFixed(2);

    payButton.disabled = false;

}



async function loadCountriesShipping(){

    try{
        let response = await fetch('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping');
        return await response.json();

    }}




//Event Listener for country selector
let countrySel = document.getElementById("country");
countrySel.addEventListener("change", );


//button disabled until shipping costs are correctly loaded
const payButton = document.getElementById('pay-button');
payButton.disabled = true;



init();

