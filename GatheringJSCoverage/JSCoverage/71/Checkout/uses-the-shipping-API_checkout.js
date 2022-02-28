import {calculatePrice} from "./frame.js";

let destinations = [];
let subtotal;
let shippingCosts;

export async function init() {
    const cart = localStorage.getItem("cart");
    if (cart === null || cart.length === 0)

    calculateSubtotal();
    await loadShippingCosts();
}

function calculateSubtotal() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let sum = 0;
    for (let item of cart) {
        sum += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    }
    subtotal = sum.toFixed(2);
    document.getElementById("price-subtotal").innerText = "" + subtotal;
}

function calculateTotal() {
    let total = parseFloat(subtotal) + parseFloat(shippingCosts);
    document.getElementById('price-total').innerText = " " + total;
}

export async function loadShippingCosts() {
    const requestUrl = "https://web-engineering.big.tuwien.ac.at/s20/a2/shipping";

    const response = await fetch(requestUrl);
    const rawData = await response.json();
    console.log(rawData.destinations);

    rawData.destinations.forEach(d => destinations.push(new destination(d.country, d.displayName, d.cost)));
    destinations.forEach(d => addOption(d));

    destinations.forEach(d => console.log(d.toString()));

    document.getElementById('country').addEventListener('change', updateShippingCost);

    updateShippingCost();
    calculateTotal();
}

function addOption(d) {
    let opt = document.createElement('option');
    opt.value = d.country;
    opt.innerHTML = d.displayName;
    document.getElementById('country').appendChild(opt);
}

export function updateShippingCost() {
    const countryCode = document.getElementById('country').value;
    /*const dest = destinations.filter(d => d.country === countryCode);
    console.log(dest.toString());*/

    for(let dest of destinations){
        if(dest.country === countryCode){
            shippingCosts = dest.cost/100;
        }
    }

    shippingCosts = shippingCosts.toFixed(2);
    console.log(shippingCosts);
    document.getElementById('price-shipping').innerText = shippingCosts;
}

export class destination {
    constructor(country, displayName, cost) {
        this.country = country;
        this.displayName = displayName;
        this.cost = cost;
    }

    toString(){
        return this.country + ", " + this.displayName + ", " + this.cost;
    }
}
