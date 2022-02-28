import { getItems } from "./cart.js";
import { calculatePrice } from "./frame.js";


export function getCart() {
    const cartItems = getItems();

    if (cartItems.length === 0)
        
    else {
        calculate();
        loadShippingCountries();
    }
}

function loadShippingCountries() {
    fetch('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping')
        .then(shippingCountries => shippingCountries.json())
        .then(shippingCountries => {
            const destinationCountries = document.getElementById('country');
            for (const destinationCountry of shippingCountries.destinations) {
                const option = document.createElement('option');
                option.value = destinationCountry.country;
                option.setAttribute('shipping-cost', destinationCountry.cost);
                option.innerHTML = destinationCountry.displayName;
                destinationCountries.appendChild(option);
            }

            calculate();
        });
}

export function calculate() {
    const subTotal = calculateSubTotal();
    calculateTotal(subTotal);
}

function calculateSubTotal() {
    const cartItems = getItems();

    let subTotal = 0;
    let cartItem = 0;
    for(let i = 0; i < cartItems.length; i++) {
        cartItem = cartItems[i];
        subTotal += calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth);
    }

    document.getElementById('price-subtotal').innerHTML = `${subTotal.toFixed(2)}`;

    return subTotal;
}

function calculateTotal(subTotal) {

    const selectedCountry = document.getElementById('country');

    if (selectedCountry.selectedIndex >= 0) {
        // euro cents --> /100
        const shippingPrice = (parseInt(selectedCountry.options[selectedCountry.selectedIndex].getAttribute('shipping-cost')) / 100);
        const total = subTotal + shippingPrice;

        document.getElementById('price-shipping').innerHTML = `${shippingPrice.toFixed(2)}`;
        document.getElementById('price-total').innerHTML = `${total.toFixed(2)}`;
        document.getElementById('pay-button').disabled = false;
    } else {
        document.getElementById('price-shipping').innerHTML = '&mdash;';
        document.getElementById('price-total').innerHTML = '&mdash;';
        document.getElementById('pay-button').disabled = true;
    }
}