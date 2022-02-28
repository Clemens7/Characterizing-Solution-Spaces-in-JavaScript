import {ARTMART_BASE_URL} from "./common.js";
import {calculatePrice} from "./frame.js";

class Checkout {
    constructor() {
        this.cartKey = 'cart';
        this.endPointShipping = 'shipping';
        this.subTotal = 0.0;
        this.total = 0.0;
        this.shipping = 0.0;
    }

    isCartEmpty() {
        const cart = this.getCart();
        return !Array.isArray(cart) || cart.length === 0;
    }

    getCart() {
        return JSON.parse(localStorage.getItem(this.cartKey));
    }

    calcSubtotal() {
        const cart = this.getCart();
        let subtotal = 0.0;
        cart.forEach(obj => {
           subtotal += calculatePrice(obj.printSize, obj.frameStyle, obj.frameWidth, obj.matWidth);
        });
        return subtotal;
    }

    fetchShippingCosts(callback) {
       fetch(ARTMART_BASE_URL + this.endPointShipping).then(r => {
           return r.json();
       }).then(r => {
           callback(r);
       });
    }

}

let co = new Checkout();

// If there are no items in the shopping cart, the user should be redirected to the empty shopping cart page.
if (co.isCartEmpty()) 

// Show the subtotal for all items in the shopping cart.
co.subTotal = co.calcSubtotal();
document.getElementById('price-subtotal').innerText = co.subTotal.toFixed(2);

// Calculate the total price including shipping costs for the selected country.
co.fetchShippingCosts(data => {
    // create the country options
    const selectionEl = document.getElementById('country');
    data.destinations.forEach(dest => {
        const o = document.createElement('option');
        o.value = dest.country;
        o.innerText = dest.displayName;
        selectionEl.appendChild(o);
    });

    // set up the onchange event handler for the selection
    selectionEl.addEventListener('change', () => {
        const countryCode = selectionEl.options[selectionEl.selectedIndex].value;
        const shippingCostEl = document.getElementById('price-shipping');
        data.destinations.forEach(dest => {
            if (countryCode === dest.country) {
                co.shipping = (Math.round((dest.cost / 100 + Number.EPSILON) * 100) / 100);
                shippingCostEl.innerText = co.shipping.toFixed(2);
            }
        });
        co.total = (Math.round((co.subTotal + co.shipping + Number.EPSILON) * 100) / 100);

        const totalEl = document.getElementById('price-total');
        totalEl.innerText = co.total.toFixed(2);

        //enable pay button
        document.getElementById('pay-button').disabled = false;
    });

    selectionEl.dispatchEvent(new Event('change'));

});
