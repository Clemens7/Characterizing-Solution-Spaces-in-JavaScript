import { calculatePrice } from './frame.js';

let parallel = [shipping(), calculateSubtotal()];
let results = parallel.map(async (job) => await job);
//methods are executed parallel but wait for both to finish before continuing

document.getElementById("country").addEventListener("change", updateShippingCosts);
updateShippingCosts();

async function calculateSubtotal() {
    let storage = window.localStorage;
    if (!storage["cart"] || Object.keys(storage["cart"]).length === 0) 
    let price = 0.0;
    let cart = JSON.parse(storage["cart"]);
    for (const item of cart) {
        let thisPrice = calculatePrice(item["printSize"], item["frameStyle"], item["frameWidth"], item["matWidth"]);
		console.log(thisPrice + " (" + JSON.stringify(item) + ")");
		price += thisPrice;
    }
    document.getElementById("price-subtotal").innerHTML = price;
}

async function shipping() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping');
    xhr.onreadystatechange = () => {
        if (xhr.readyState != 4) return;
        window.sessionStorage["countries"] = JSON.stringify(xhr.response.destinations);
        let countries = document.getElementById("country");
        for (let i = 0; i < xhr.response.destinations.length; i++) {
            const dest = xhr.response.destinations[i];
            let option = document.createElement("option");
            option.text = dest.displayName;
			option.value = dest.country;
            countries.add(option);
        }
        document.getElementById("pay-button").disabled = false;
    }
    xhr.send();
}

function updateShippingCosts() {
    let c = document.getElementById("country").selectedIndex;
    c = (c == undefined || c < 0 ? 0 );
    console.log(`Change shipping costs to ${JSON.parse(window.sessionStorage["countries"])[c]["country"]}`);
    let cost = JSON.parse(window.sessionStorage["countries"])[c]["cost"] / 100.0;
    document.getElementById("price-shipping").innerHTML = cost.toFixed(2);
    cost += Number(document.getElementById("price-subtotal").innerHTML);
    document.getElementById("price-total").innerHTML = cost.toFixed(2);
}

//test data
//[{"object-id": 13, "printSize": "M", "frameStyle": "classic", "frameWidth": 4, "matColor": "wine", "matWidth": 5.5}]