import {calculatePrice} from "./frame.js";

const apiURL = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';

// just for testing while cart is not implemented
var tmpItem =
    [{
        'objectID': 742094,
        'printSize': 'L',
        'frameStyle': 'classic',
        'frameWidth': 27,
        'matColor': 'indigo',
        'matWidth': 31
    }, {
        'objectID': 459055,
        'printSize': 'L',
        'frameStyle': 'classic',
        'frameWidth': 27,
        'matColor': 'indigo',
        'matWidth': 31
    }];

//if cart is empty -> redirect
if (!localStorage.getItem('cart') || localStorage.getItem('cart') == null) 

//console.log('cart items for testing:', tmpItem);
//window.localStorage.setItem('cart', JSON.stringify(tmpItem));
const shoppingCart = JSON.parse(localStorage.getItem('cart'));

let globalSubTotal = 0;
let globalShipping = 0;

calculateSubTotal();

// get countries from the server
async function fetchCountries(url) {
    try {
        document.getElementById("pay-button").disabled = true;
        document.getElementById('price-shipping').innerHTML = '\u2014';
        document.getElementById('price-total').innerHTML = '\u2014';
        let result = await fetch(url);
        let data = await (result.json());
        return data;
    }}

// fill country select in html page and calculate shipping
async function fillCountries() {
    let countries = await fetchCountries(apiURL);
    countries = countries.destinations;
    //console.log('COUNTRIES:', countries);

    let selectOptions = document.getElementById('country');
    for (let i = 0; i < countries.length; i++) {
        let option = document.createElement("OPTION"), txt = document.createTextNode(countries[i].displayName);
        //console.log(option);
        option.appendChild(txt);
        option.setAttribute("value", countries[i].country);
        option.setAttribute("id", countries[i]);
        option.setAttribute("cost", countries[i].cost);
        selectOptions.insertBefore(option, selectOptions.lastChild);
    }

    let shipping = document.getElementById('country').addEventListener('change', function () {
        for (let c of countries) {
            if (c.country == this.value) {
                // calculate shipping costs
                let shipping = Math.round((c.cost + Number.EPSILON) * 100) / 10000;
                document.getElementById('price-shipping').innerHTML = `${shipping.toFixed(2)}`;
                globalShipping = shipping;
                //console.log('globalshipping: ', shipping);
                calculateTotal();
            }
        }
    });
}

fillCountries();

// calculate sub total
async function calculateSubTotal() {
    let subtotal = 0;
    for (let i = 0; i < shoppingCart.length; i++) {
        subtotal += parseFloat(calculatePrice(shoppingCart[i].printSize, shoppingCart[i].frameStyle, shoppingCart[i].frameWidth, shoppingCart[i].matWidth));
        //console.log('printSize: ',  shoppingCart[i].printSize);
        //console.log('frameStyle: ', shoppingCart[i].frameStyle);
        //console.log('frameWidth: ', shoppingCart[i].frameWidth);
        //console.log('matWidth: ',   shoppingCart[i].matWidth);
    }
    globalSubTotal = subtotal;
    document.getElementById('price-subtotal').innerHTML = `${subtotal.toFixed(2)}`;
}

// calculate total price including shipping
async function calculateTotal() {
    let total = globalSubTotal + globalShipping;
    //console.log('total: ', total);
    document.getElementById('price-total').innerHTML = `${total.toFixed(2)}`;
}