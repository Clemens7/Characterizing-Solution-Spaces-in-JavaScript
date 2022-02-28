
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

    addSearchitem(item) {
        this.container.appendChild(createThumbItem(item));

        function createThumbItem(item) {
            return DOM.containerWithAttributes([
                DOM.containerWithAttributes([
                    createImgItem(item), 
                    createLabelItem(item)
                ], {href: "/config.html?objectID="+item.objectID, id: "object-" + item.objectID}, "a")
            ], {className: "thumb"}, "div");
        }
        
        function createImgItem(item) {
            let img
            return DOM.containerWithAttributes([], {
                src: item.primaryImage == ''  : item.primaryImage,
                alt: item.title,
                id: "object-image-" + item.objectID
            }, "img");
        }

        function createLabelItem(item) {
            return DOM.containerWithAttributes([
                createSpanItem("artist", item.artistDisplayName),
                createSpanItem("title", item.title + ", "),
                createSpanItem("date", item.objectDate)
            ], {className: "museum-label"});
        }

        function createSpanItem(className, innerText) {
            let container = DOM.containerWithAttributes([], {className: className}, "span");
            container.innerText = innerText;
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
    


}
