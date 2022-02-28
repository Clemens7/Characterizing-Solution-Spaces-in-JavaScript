import {calculatePrice} from "./frame.js";

let itemPrice = 0.0;
let response = null;

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }}

function calcPrice() {
    const country_select = document.getElementById("country");
    if(country_select.options[country_select.selectedIndex] == null){
        return;
    }
    if(response == null)
    let value = country_select.options[country_select.selectedIndex].value;
    for(let elem in response.destinations){
    	let tmp = response.destinations[elem];
    	if(tmp.country == value){
    	    value = tmp.cost;
    	    break;
    	}
    }
    if (value == 0 || itemPrice === 0) 
    value /= 100.0;
    document.getElementById('price-subtotal').innerHTML = '' + (parseFloat(itemPrice).toFixed(2));
    document.getElementById('price-shipping').innerHTML = '' + (parseFloat(value).toFixed(2));
    document.getElementById('price-total').innerHTML = '' + (parseFloat((itemPrice + value)).toFixed(2));
    document.getElementById('pay-button').disabled = false;
}

function onPageLoad() {
    let cart = localStorage.getItem('cart');
    cart = JSON.parse(cart);
    if (isEmpty(cart)) 

    //Disable pay button
    document.getElementById('pay-button').disabled = true;

    //Fill in countries
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let sel = document.getElementById('country');
            response = JSON.parse(xmlHttp.responseText);
            for (let dest of response.destinations) {
                let opt = document.createElement('option');
                opt.innerHTML = dest.displayName;
                opt.value = dest.country;
                opt.label = dest.displayName;
                sel.appendChild(opt);
            }
            calcPrice();
        }
    }
    xmlHttp.timeout = 100;
    xmlHttp.open("GET", 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping', true);
    xmlHttp.send();

    itemPrice = 0.0;
    for (const elem in cart) {
        const item = cart[elem];
        itemPrice += calculatePrice(cart[elem].printSize, cart[elem].frameStyle, cart[elem].frameWidth, cart[elem].matWidth);
    }
    calcPrice();
}

document.addEventListener("DOMContentLoaded", onPageLoad);
document.getElementById('country').addEventListener('change', calcPrice);
