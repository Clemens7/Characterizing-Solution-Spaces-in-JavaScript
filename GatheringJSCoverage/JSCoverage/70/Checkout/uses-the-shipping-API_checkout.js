
import { calculateTotalCartPrice, getCart } from '/cache.js';

/** set dummy cart for testing purposes 

window.localStorage.setItem('cart', JSON.stringify([
            {objId: 111, printSize: 'S', frameStyle: 'natural', frameWidth: 20, matWidth: 50},
            {objId: 222, printSize: 'M', frameStyle: 'shabby', frameWidth: 30, matWidth: 30},
            {objId: 222, printSize: 'L', frameStyle: 'elegant', frameWidth: 20, matWidth: 50},
            ])
        );

/************* */

const select = document.getElementById('country');
const shipping = document.getElementById('price-shipping');
const subtotal = document.getElementById('price-subtotal');
const total = document.getElementById('price-total');
const cart = getCart();
let cart_price = calculateTotalCartPrice();
let countries;


async function getCountries() {
    const response = await fetch(`https://web-engineering.big.tuwien.ac.at/s20/a2/shipping`);
    const responseData = await response.json();
    return responseData;
};


function updateCosts() {
    let c = select.value;
    for (const i in countries) {
        let obj = countries[i];
        if(obj['country'] == c ) {
            let costs = (obj['cost'] / 100);
            shipping.innerText = ( costs ).toFixed(2);
            total.innerText = ( cart_price + costs).toFixed(2);
            break;
        }
    }
}



if(!cart)  else {
    subtotal.innerText = (cart_price).toFixed(2);
}


getCountries().then(response => {

    countries = response['destinations'];

    for (const i in countries) {
        let obj = countries[i];
        select.options[select.options.length] = new Option(obj['displayName'], obj['country'], false, false);      
    }
    updateCosts();
})
.catch( );


select.addEventListener('change', updateCosts);







