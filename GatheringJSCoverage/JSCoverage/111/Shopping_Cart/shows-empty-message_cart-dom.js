import * as DOM from "./dom-helpers.js"
import * as Frame from "../frame.js"
import * as CacheAPI from "./cache-api.js"
import * as CONSTANTS from "./constants.js"
import * as Cart from "./cart.js"
import * as CartService from "./cart-service.js";

export class CartItemContainer {
    constructor(containerID = 'cart') {
        this.container = document.getElementById(containerID);
        if (!this.container) 
    }

    clear() {
        this.container.innerHTML = '';
    }

    addEmptyMessageToDocument() {
        this.container.appendChild(DOM.addCSSClass(DOM.textElement("span", "There are no items in your shopping cart."), ["cart-item"]));
        this.container.appendChild(createCheckoutDisabled())

        function createCheckoutDisabled() {
            let b = document.createElement('button');
            b.innerHTML = "Checkout";
            b.type = "button";

            let div = DOM.container([
                DOM.setAttributes(b, { id: "checkout-button", disabled: "true" })
            ], 'div');

            return DOM.addCSSClass(div, ["cart-total"]);
        }
    }

    

    
}

class PreviewImageDocumentElement {

    

    

}