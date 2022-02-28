
import * as DOM from './dom-helpers.js';
import * as Frame from './frame.js';
import { retrieveObj } from './metCache.js';

export class ItemDocumentContainer {
    constructor(containerID) {
        this.container = document.getElementById(containerID);
        if(!this.container) 
    }

    clear() {
        this.container.innerHTML = '';
    }

    

    addNoItemText() {
        this.container.appendChild(createCartItem());

        function createCartItem() {
            let container = DOM.containerWithAttributes([], {id: "noItem"}, "div");
            container.innerText = "There are no items in your shopping cart.";
            return container;
        }
    }

/*
      <div class="cart-item">
        <div class="cart-preview" id="preview-container-0">
          <a href="">
            <img class="cart-thumb" src="" id="preview-0" alt="">
          </a>
        </div>
        <div class="museum-label">
          <div>
            <span class="artist"></span>
            <span class="title"></span>,
            <span class="date"></span>
            <br><br>
            <span class="frame-description"></span>
          </div>
          <div class="cart-price">€
            <span id="price-0">0</span>
          </div>
          <button class="cart-remove"></button>
        </div>
      </div>
 */
    

    /*
      <div class="cart-total">
        <div class="price">Total: €
            <span id="price-total">0</span>
        </div>
        <button type="button" id="checkout-button">Checkout</button>
      </div>
     */
    addCartCheckout(totalPrice) {
        this.container.appendChild(createCheckout());

        function createCheckout() {
            return DOM.containerWithAttributes([
                createPriceElem(),
                createButtonElem(),
            ], {className: "cart-total"}, "div");
        }

            function createButtonElem() {
                let container = DOM.containerWithAttributes([], {type: "button", id: "checkout-button"}, "button");
                container.innerText = "Checkout";
                return container;
            }

            function createPriceElem() {
            /*
                let container = DOM.containerWithAttributes([
                    createPrice(totalPrice)
                ], {className: "price"}, "div");
                container.innerText = "Total: \u20AC";
                return container;

                function createPrice(innerText) {
                    let container = DOM.containerWithAttributes([], {id: "price-total"}, "span");
                    container.innerText = innerText;
                    return container;
                }
             */
                let p = document.createElement("div");
                p.setAttribute("class", "price");
                p.innerHTML = "Total: \u20AC ";

                let t = document.createElement("span");
                t.setAttribute("id", "price-total");
                t.innerHTML = totalPrice.toFixed(2);
                p.appendChild(t);

                return p;
            }
    }


}
