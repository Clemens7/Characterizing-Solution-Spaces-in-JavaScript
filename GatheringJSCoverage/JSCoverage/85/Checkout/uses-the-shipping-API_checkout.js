import * as Cart from './cart.js';

let countryOptions = "";
let destinations;
let currentShippingCost, subtotal, total;

export function init() {

    if(!Cart.getCart().length>0)

    document.getElementById("pay-button").disabled = true;
    subtotal = Cart.calcSum();
    document.getElementById("price-subtotal").innerHTML = `${subtotal}`;

    document.getElementById("country").addEventListener("change",changeCountry);

    getShipping().then(data => {
        destinations = data.destinations;
        destinations.forEach(destination =>{
            let countryCode, countryName, cost;
            countryCode = destination.country;
            countryName = destination["displayName"];
            cost = destination["cost"];
            countryOptions += `<option value=${countryCode}>${countryName}</option>\n`;
        });
        //shipping API finished loading
        document.getElementById("country").innerHTML = countryOptions;
        changeCountry();
        document.getElementById("pay-button").disabled = false;
    });
}

async function getShipping() {
    const url = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';
    let response = await fetch(url);
    return await response.json();
}

function changeCountry() {
    let e = document.getElementById("country");
    let newCountry = e.options[e.selectedIndex].value;
    let currentCountryCode;
    destinations.forEach(destination =>{
        let countryCode, cost;
        countryCode = destination.country;
        cost = destination["cost"];
        cost = (parseFloat(cost)/100).toFixed(2);
        if(countryCode === newCountry){
            currentShippingCost = cost;
            document.getElementById("price-shipping").innerHTML = `${currentShippingCost}`;
            setTotalSum();
        }
    })
}

function setTotalSum(){
    total = (parseFloat(subtotal) + parseFloat(currentShippingCost)).toFixed(2);
    document.getElementById("price-total").innerHTML = `${total}`;
}
