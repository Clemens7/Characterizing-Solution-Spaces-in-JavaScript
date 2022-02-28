import { CartItem } from "./classes.js";
import { calculatePrice } from "./frame.js";
class ShippingCost {
    constructor(country, displayName, cost) {
        this.country = country;
        this.displayName = displayName;
        this.cost = cost;
    }
}
class ShippingCosts {
    constructor() {
        this.loadShoppingCart();
        this.loadShippingCosts();
    }
    loadShippingCosts() {
        fetch('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping')
            .then(res => res.json())
            .then(data => {
            this.shippingCosts = data.destinations.map(shippingCost => new ShippingCost(shippingCost.country, shippingCost.displayName, shippingCost.cost / 100));
            this.setCountryOptions();
            this.setPayButtonStatus(true);
        })
            .catch();
    }
    loadShoppingCart() {
        const cartItemsInStorage = JSON.parse(localStorage.getItem('cart'));
        this.cartItems = cartItemsInStorage.map(cartItem => new CartItem(cartItem.objectID, cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matColor, cartItem.matWidth));
        this.updateShippingCosts(this.getSubTotal.toString(), "&mdash;", "&mdash;");
    }
    setCountryOptions() {
        const selectCountryElement = document.getElementById('country');
        this.shippingCosts.forEach(shippingCost => {
            const option = document.createElement('option');
            option.text = shippingCost.displayName;
            option.value = shippingCost.country;
            selectCountryElement.add(option);
        });
        selectCountryElement.onchange(null);
    }
    updateShippingCosts(subTotal, shippingCost, total) {
        const subTotalElement = document.getElementById('price-subtotal').innerHTML = subTotal;
        const shippingCostElement = document.getElementById('price-shipping').innerHTML = shippingCost;
        const totalElement = document.getElementById('price-total').innerHTML = total;
    }
    setPayButtonStatus(status) {
        const payButtonElement = document.getElementById('pay-button');
        payButtonElement.disabled = !status;
    }
    getSubTotal() {
        let subTotal = 0;
        this.cartItems.forEach(cartItem => {
            subTotal += calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth);
        });
        return subTotal;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('cart') === null || JSON.parse(localStorage.getItem('cart')).length === 0) 
    const shippingCosts = new ShippingCosts();
    initListeners();
    function initListeners() {
        const selectCountryElement = document.getElementById('country');
        selectCountryElement.onchange = changeCountry;
    }
    function changeCountry(element) {
        const selectCountryElement = document.getElementById('country');
        const selectedCountry = selectCountryElement.options[selectCountryElement.selectedIndex].value;
        const shippingCost = shippingCosts.shippingCosts.find(shippingCost => shippingCost.country === selectedCountry);
        const subTotal = shippingCosts.getSubTotal();
        shippingCosts.updateShippingCosts(subTotal.toString(), shippingCost.cost.toFixed(2).toString(), (subTotal + shippingCost.cost).toFixed(2).toString());
    }
});
