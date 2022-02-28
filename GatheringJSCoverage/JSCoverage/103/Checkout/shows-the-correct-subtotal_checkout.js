import {getCartProducts, isCartEmpty} from "./cart-helpers.js";
import {calculatePrice} from "./frame.js";

const countryId = document.getElementById('country');
const priceShipping = document.getElementById('price-shipping');
const payButton = document.getElementById('pay-button');
const priceSubtotal = document.getElementById('price-subtotal');
const priceTotal = document.getElementById('price-total');

const URL = "https://web-engineering.big.tuwien.ac.at/s20/a2/shipping";

redirect();
window.addEventListener('load', () => retrieveDest());
setPrices();

function redirect() {
    if (isCartEmpty()) 
}

async function retrieveDest() {
    const myRequest = new Request(URL);
    fetch(myRequest)
        .then(data => data.json())
        .then(data => {
            for (const dest of data.destinations) {
                const dropdownElement = document.createElement('option');
                dropdownElement.value = dest.country;
                dropdownElement.setAttribute('cost', dest.cost);
                dropdownElement.innerHTML = dest.displayName;
                countryId.appendChild(dropdownElement);
            }
            setPrices();
        });
}

function setPrices () {
    let subTotal = 0;
    getCartProducts().map(p => {
        if (p != null) {
            subTotal += calculatePrice(
                p.printSize,
                p.frameStyle,
                p.frameWidth,
                p.matWidth);
        }
    });
    priceSubtotal.innerHTML = `${subTotal.toFixed(2)}`;
    if (countryId.selectedIndex >= 0) {
        let shipping;
        if (countryId.options[countryId.selectedIndex].getAttribute('cost') != null) {
             shipping = parseInt(
                countryId.options[countryId.selectedIndex].getAttribute('cost')) / 100;
        }
        const total = subTotal + shipping;
        priceShipping.innerHTML = `${shipping.toFixed(2)}`;
        priceTotal.innerHTML = `${total.toFixed(2)}`;
        payButton.disabled = false;
    } else {
        priceShipping.innerHTML = '&mdash;';
        priceTotal.innerHTML = '&mdash;';
        payButton.disabled = true;
    }
}

