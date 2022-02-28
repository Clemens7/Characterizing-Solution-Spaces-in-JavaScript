import * as myStorage from './localStorage.js';
import {calculatePrice} from './frame.js';

let items = [];
let countries = {};
let subtotal = 0;

function init(){
    const cartContent = myStorage.getCart();

    console.log(cartContent);

    if(cartContent.length === 0)else{
        items = cartContent;

        items.forEach(item => {
            const {printSize, frameStyle, frameWidth, matWidth} = item;
            subtotal += calculatePrice(printSize, frameStyle, frameWidth, matWidth);
        });

        document.querySelector("#price-subtotal").textContent = subtotal;

    }
}

function updateShippingcost(shippingCost){
    const shippingCostElement = document.querySelector("#price-shipping");
    const totalCostElement = document.querySelector("#price-total");

    const intCost = parseInt(shippingCost)/100;

    shippingCostElement.textContent = intCost.toFixed(2);
    totalCostElement.textContent = (subtotal + intCost).toFixed(2);
}


async function setShippingContries(){
    let response = await fetch("https://web-engineering.big.tuwien.ac.at/s20/a2/shipping");

    if(response.ok){
        const json = await response.json();
        const destinations = json.destinations;

        const selectElemet = document.querySelector("select#country");

        destinations.forEach( item => {
            const option = document.createElement("option");
            option.textContent = item.displayName;
            option.setAttribute("value", item.country);
            selectElemet.appendChild(option);
            countries[item.country] = item.cost;
        });

        document.querySelector("#pay-button").disabled = false;
        updateShippingcost(destinations[0].cost);
    }

}

document.querySelector("#pay-button").disabled = true;
init();
setShippingContries();


function handleCountrySelect(event){
    const newPrice = event.target.value;
    updateShippingcost(countries[newPrice]);
}

document.querySelector("select#country").addEventListener("change", handleCountrySelect);
