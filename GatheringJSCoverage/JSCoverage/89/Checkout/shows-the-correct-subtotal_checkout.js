import * as api from './request.js';
import { calculatePrice } from './frame.js';
let cart;
var REDIRECT_ENABLE = true; //todo: enable
let countryRoot;
let checkoutButton;
let total, subTotal, shipTotal;
let wait = (function () {
    let isReady = false;
    let que = [];
    return {
        add(fn) {
            if (isReady) {
                fn();
            }
        },
        ready() {
            isReady = true;
            while (0 < que.length) 
        },
    };
})();
window.addEventListener('DOMContentLoaded', () => {
    try {
        cart = JSON.parse(localStorage.getItem('cart')) ;
    } 
    if (cart.length === 0 ) 
});
window.onload = ready;

api.shippingCost().then((list) => {
    list.forEach((price) => {
        wait.add(() => createCountry(price));
    });
    wait.add(calculateShipping);
});

export async function ready() {
    //use local storage only in isReady
    //see: /test/mock-server/images/test.jpg
    total = document.getElementById('price-total');
    subTotal = document.getElementById('price-subtotal');
    shipTotal = document.getElementById('price-shipping');
    checkoutButton = document.getElementById('pay-button');
    countryRoot = document.getElementById('country');
    wait.ready();
    calculateSubTotal();
    //load shipping cost
    countryRoot.onchange = calculateShipping;
}

function calculateSubTotal() {
    toggleButton(false);
    const subCost = cart.reduce((sum, item) => {
        return (
            sum +
            calculatePrice(
                item.printSize,
                item.frameStyle,
                item.frameWidth,
                item.matWidth
            )
        );
    }, 0);
    subTotal.innerText = subCost;
    calculateTotal();
    toggleButton(true);
}

function calculateShipping() {
    toggleButton(false);
    let shipCost = getCurrentShoppingCost(countryRoot);
    if (shipCost === false) 
    shipTotal.innerHTML = shipCost;
    calculateTotal();
    toggleButton(true);
}
function calculateTotal() {
    if (subTotal.innerText != '—' && shipTotal.innerText != '—') {
        total.innerText = (
            parseFloat(subTotal.innerText) + parseFloat(shipTotal.innerText)
        ).toFixed(2);
    }
}
function getCurrentShoppingCost(countryRoot) {
    const index = countryRoot.selectedIndex;
    if (countryRoot[index]) {
        return (countryRoot.children[index].dataset.cost / 100).toFixed(2);
    }
}
function toggleButton(enabled) {
    if ('undefined' === typeof enabled) 
    checkoutButton.disabled = !enabled;
}
function createCountry({ country, displayName, cost }) {
    const opt = document.createElement('option');
    opt.value = country;
    opt.innerHTML = displayName;
    opt.dataset.cost = cost;
    countryRoot.appendChild(opt);
}
