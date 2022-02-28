/*
If there are no items in the shopping cart, the user should be redirected to the empty shopping cart page.

Show the subtotal for all items in the shopping cart.

Calculate the total price including shipping costs for the selected country.

Get the available countries and associated shipping costs using the Artmart Shipping API.
    While the data is loading, or in case there was an error, the shipping costs and total price should be replaced by an em-dash (i.e. € —) and the pay button should be disabled.

The pay button doesn't have to do anything.
 */

import {calculatePriceFromItem} from "./frame.js";


let testing = false;
let items = JSON.parse(localStorage.getItem("cart"));
if (testing) 

if (items === null)
    


let dest = [];
let subtotal = 0;
let total = 0;
let shipping = 0;


const sel = document.getElementById("country");
sel.addEventListener("change", update_prices);

const btn = document.getElementById("pay-button");
btn.disabled = true;

window.onload = populate_site();

function populate_site() {
    fetch_countries();
}

function fetch_countries() {
    fetch("https://web-engineering.big.tuwien.ac.at/s20/a2/shipping",
        {method: "GET"})
        .then((r) => {
            if (r.ok) return r.json();
        })
        .catch()
        .then((data) => {
            dest = data.destinations;
            console.log(dest)
            for (let i = 0; i < dest.length; i++) {
                createOptionElement(dest[i]);
            }
            btn.disabled = false;
            btn.addEventListener("onclick", pay);
            update_prices();
        })
}

function update_prices() {
    set_shipping();
    set_subtotal();
    set_total();
}

function set_subtotal() {
    let subtotal_ = 0;
    for (let i = 0; i < items.length; i++) {
        const k = calculatePriceFromItem(items[i])
        subtotal_ += k;
    }
    subtotal = subtotal_;
    document.getElementById("price-subtotal").innerHTML = subtotal.toString();
    console.log(document.getElementById("price-subtotal").innerHTML);
}

function set_shipping() {
    for (let i = 0; i < dest.length; i++) {
        if (dest[i].country === sel.value) {
            shipping = +dest[i].cost / 100;
            break;
        }
    }
    document.getElementById("price-shipping").innerHTML = shipping.toFixed(2);
    set_total()
}

function set_total() {
    console.log(subtotal);
    console.log(shipping);
    total = subtotal + shipping;
    document.getElementById("price-total").innerHTML = total.toFixed(2);
}


function createOptionElement(country) {
    console.log(country);
    const o = document.createElement("option");
    o.text = country.displayName;
    o.value = country.country;
    document.getElementById("country").appendChild(o);
}





