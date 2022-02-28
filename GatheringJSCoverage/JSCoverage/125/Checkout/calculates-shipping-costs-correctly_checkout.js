import {get_shipping} from "./shipping-api.js";
import {getCartContent} from "./cart-cache.js";
import {calculatePrice} from "./frame.js";

/*
 * Page modification
 */

document.addEventListener('DOMContentLoaded', () => preparePageUpdate());
document.getElementById('country').addEventListener('change', () => preparePageUpdate());

function preparePageUpdate() {
    const cartContent = getCartContent();
    if (cartContent.length === 0)  else {
        get_shipping().then(destinations => {
            updatePage(destinations, cartContent);
        })
    }
}

function updatePage(destinations, cartContent) {
    let subTotal = 0;
    for (const item of cartContent) {
        subTotal += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    }
    document.getElementById('price-subtotal').innerText = subTotal;

    const countrySelect = document.getElementById('country');
    for (const destination of destinations) {
        if (!Array.from(countrySelect.children).find(option => option.value === destination.country)) {
            countrySelect.insertAdjacentHTML('beforeend', `<option value="${destination.country}">${destination.displayName}</option>`);
        }
    }

    if (destinations.length > 0) {
        const cost = destinations.find(dest => dest.country === document.getElementById('country').value).cost;
        document.getElementById('price-shipping').innerText = (cost / 100).toFixed(2);
        document.getElementById('price-total').innerText = (subTotal + (cost / 100));
    }
}
