import { calculatePrice } from './frame.js';

let cart = JSON.parse(localStorage.getItem("cart"));
if (cart === null) 

let countryCostLookupTable = {};
let subtotal = 0;

window.addEventListener('load', () => {

    cart.forEach((item) => {
        subtotal += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    });
    document.getElementById("price-subtotal").innerHTML = subtotal.toFixed(2);

    fetch('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping')
        .then((res) => {
            if (!res.ok) 
            return res.json();
        }).then((res) => {
            let selectOptionHTMLString = [];
            res.destinations.forEach((entry, i) => {
                countryCostLookupTable[entry.country] = entry.cost;
                let first = i === 0 ? ' selected="selected"' : '';
                selectOptionHTMLString.push(`<option value="${entry.country}" ${first}>${entry.displayName}</option>`);
                if (i === 0) updatePrice(entry.country);
            });
            document.getElementById('country').innerHTML = selectOptionHTMLString.join('\n');
        }).catch();
});

document.getElementById('country').addEventListener('change', );

const updatePrice = (country) => {
    let shippingCost = (countryCostLookupTable[country] / 100).toFixed(2);
    let totalCost = (subtotal + (countryCostLookupTable[country] / 100)).toFixed(2);
    document.getElementById("price-shipping").innerHTML = shippingCost;
    document.getElementById("price-total").innerHTML = totalCost;
}
