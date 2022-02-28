import * as artmartAPI from './artmartAPI.js';
import * as frame from './frame.js';
import * as Cart from './cartCache.js'


let shippingCost = 0;
let shippingList;
let cartObjects = Cart.retrieve();

if (cartObjects.length === 0) 

async function loadShippingCountries(){
    const destinations = await artmartAPI.retrieve();
    shippingList = destinations;
    if (!destinations)else {
        generateOptionHTML(destinations);
        document.getElementById("pay-button").disabled = false;
    }
}
function generateOptionHTML(destinations) {
    const selector = document.getElementById("country");
    for (let dest of destinations){
        const option = document.createElement("option");
        option.innerText = dest.displayName;
        option.setAttribute("value", dest.country);
        selector.appendChild(option);
    }
}



function setShippingCost(){
    const selector = document.getElementById("country");
    for (let dest of shippingList){
        if (dest.country === selector.value){
            let cost = parseFloat(parseFloat(dest.cost)/100).toFixed(2);
            console.log("Currently selected country is " + dest.country + ": " + dest.displayName);
            document.getElementById("price-shipping").innerHTML = cost;
        }
    }
}


function calculateSubtotal(){
    console.log('in calculateSubtotal');
    let cart = Cart.retrieve();
    let subtotal = 0.0;

    for (let item of cart){
        console.log(`Checking price for ${item.objectID}`);
        subtotal = subtotal + frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    }
    subtotal = subtotal.toFixed(2);
    document.getElementById("price-subtotal").innerText = subtotal;
}

function calculateTotal(){
    console.log('In calculateTotal');
    let subtotal = parseFloat(document.getElementById('price-subtotal').innerHTML);
    console.log(`Got subtotal: ${subtotal}`);
    let shippingCost = parseFloat(document.getElementById('price-shipping').innerHTML);
    console.log(`Got shippingCost: ${shippingCost}`);

    let total  = subtotal + shippingCost;
    total = total.toFixed(2);

    document.getElementById("price-total").innerHTML = total;
}

window.addEventListener('DOMContentLoaded', async function () {
    calculateSubtotal();
    await loadShippingCountries();

    setShippingCost();
    calculateTotal();
    document.getElementById('country').addEventListener('change',);
});
