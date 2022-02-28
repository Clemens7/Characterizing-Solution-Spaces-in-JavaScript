import { artService } from "./artService.js";
import { cache } from "./cache.js";
import * as domHelper from "./dom-helper.js"
import * as frame from "./frame.js"

function redirectIfEmpty() {
    if (cache.getCartItems().length <= 0) 
}

async function setCountryDropdown() {
    const dropdown = document.getElementById("country");
    const shipping = await artService.getShipping();

    for (let item of shipping) {
        const option = domHelper.textElement("option", item.displayName);
        domHelper.setAttributes(option, { "value": item.country });

        dropdown.appendChild(option);
    }

    dropdown.addEventListener("change", () => { setPrices(); }, false);
}

async function setPrices() {
    const cartItems = cache.getCartItems();
    let totalPrice = 0;

    for (let item of cartItems) {
        totalPrice += frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    }

    const subtotalPriceElement = document.getElementById("price-subtotal");
    subtotalPriceElement.innerText = (Math.round((totalPrice + Number.EPSILON) * 100) / 100);


    const shipping = await artService.getShipping();
    const dropdown = document.getElementById("country");
    const selectedCountry = dropdown.options[dropdown.selectedIndex].value;
    const shippingPriceElement = document.getElementById("price-shipping");
    const totalPriceElement = document.getElementById("price-total");
    const payButton = document.getElementById("pay-button");

    let error = true;

    for(let item of shipping){
        if(item.country === selectedCountry){
            shippingPriceElement.innerText = (Math.round(((item.cost/100) + Number.EPSILON) * 100) / 100).toFixed(2);
            totalPriceElement.innerText = (Math.round(((totalPrice + item.cost/100) + Number.EPSILON) * 100) / 100);
            payButton.disabled = false;
            error = false;
            break;
        }
    }

    if(error === true)
}

redirectIfEmpty();
setCountryDropdown();
setPrices();