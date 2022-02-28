import StorageHandler from './storage-handler.js';
import {calculatePrice} from './frame.js';
import {showItemsDynamically} from "./cart.js";

window.onload = function () {
    showItemsDynamically();
}

// Variables
const x = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';
let calculate_price = 0;
const subtotal = document.getElementById("price-subtotal");
const total_sum = document.getElementById("price-total");
const shipping_cost = document.getElementById("price-shipping");
const country = document.getElementById("country");

// API, Countries + Shipping Costs
async function getData() {
    const response = await fetch (x);
    const data = await response.json();
    return data;
}

// if no items in card, go back to cart. Else get items in card and calculate the subtotal
if(StorageHandler.getCartSize() === 0)else{
        const cart_array = JSON.parse(localStorage.getItem("cart"));
        console.log(Number.EPSILON);
        for (let i = 0; i < cart_array.length; i++) {
            calculate_price = calculate_price + calculatePrice(cart_array[i].printSize, cart_array[i].frameStyle,
                cart_array[i].frameWidth, cart_array[i].matWidth);

        }
        subtotal.innerHTML = "" + calculate_price;
}

// put countries from API for selection
getData().then(function(response){
    for(let i = 0; i < response.destinations.length; i++){
        const option = document.createElement("OPTION");
        option.value = response.destinations[i].country;
        option.innerHTML = response.destinations[i].displayName;
        country.appendChild(option);
    }
}).catch();

// if the default country is changed, calculate the new shipping cost and total cost
country.addEventListener("change", function (){
    let int = country.selectedIndex;
    getData().then(function(response){
        const cost_int = response.destinations[int].cost;
        shipping_cost.innerHTML = (cost_int/100).toFixed(2) + "";
        total_sum.innerHTML = (calculate_price + (cost_int/100)) + "";
    }).catch();
});









