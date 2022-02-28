import API from './APIRequests.js';
import { calculatePrice } from './frame.js';

const elements = {
    countrySelect: document.getElementById("country"),
    subtotal: document.getElementById("price-subtotal"),
    shipping: document.getElementById("price-shipping"),
    total: document.getElementById("price-total"),
}

export default class Checkout {

    constructor() {
        this.cartEmpty();
        this.addCountries();

        this.writeSubtotal();
        this.writeShipping();
        this.writeTotal();

        elements.countrySelect.onchange = ;
    }

    cartEmpty() {
        if (localStorage['cart'] === undefined || Object.keys(localStorage['cart']) === 0) 
    }

    writeSubtotal() {
        elements.subtotal.innerHTML = this.calcStringSubtotal();
    }

    async writeTotal() {
        elements.total.innerHTML = await this.calcTotal();
    }

    async writeShipping() {
        elements.shipping.innerHTML = await this.calcShipping();
    }

    calcStringSubtotal() {
        var subtotal = 0;
        var items = JSON.parse(localStorage['cart']);
        Object.keys(items).forEach(id => {
            subtotal += calculatePrice(items[id].printSize, items[id].frameStyle, items[id].frameWidth, items[id].matWidth);
        });
        return subtotal;
    }

    calcSubtotal() {
        var subtotal = 0;
        var items = JSON.parse(localStorage['cart']);
        Object.keys(items).forEach(id => {
            subtotal += parseFloat(calculatePrice(items[id].printSize, items[id].frameStyle, items[id].frameWidth, items[id].matWidth));
        });
        return subtotal;
    }

    async calcTotal() {
        var subtotal = this.calcSubtotal();
        var shipping = parseFloat(await this.calcShipping());
        
        return subtotal + shipping === NaN  : (subtotal + shipping).toFixed(2);
    }

    async calcShipping() {
        var countryJson = await API.getCountries();
        return (JSON.stringify(countryJson.destinations[elements.countrySelect.selectedIndex].cost) / 100).toFixed(2);
    }

    async addCountries() {
        var countryJson = await API.getCountries();

        countryJson.destinations.forEach(obj => {
            var option = document.createElement('option');
            option.text = obj.displayName;
            option.value = obj.country;
            elements.countrySelect.add(option);
        });
    }
}

new Checkout();