import * as DOM from './dom_helper.js';
import * as Frame from "./frame.js";
import * as API from './metropolitan_api.js';

export class Cart {
    static key = 'cart';

    static 

    static updateCartItemCounter() {
        document.getElementById("cart-link").innerText = `Cart ${Cart.numberOfItems() > 0
            
            : ""}`;
    }

    static 

    static 

    static 

    static getItems() {
        if (localStorage[this.key]) {
            return JSON.parse(localStorage[this.key]);
        }
    }

    static numberOfItems() {
        let cartString = localStorage[this.key];
        if (cartString) {
            return JSON.parse(cartString).length;
        }
    }
}

export class CartItem {
    
}

export class CartContainer {
    constructor(containerID = 'cart') {
        this.container = document.getElementById(containerID);
        if (!this.container) 
    }

    clear() {
        this.container.innerHTML = '<span id="cart-empty">There are no items in your shopping cart.</span>' +
            '<div class="cart-total">\n' +
            '        <div class="price">Total: € <span id="price-total">0</span></div>\n' +
            '        <button disabled type="button" id="checkout-button">Checkout</button>\n' +
            '      </div>';
    }

    

    

    

}

