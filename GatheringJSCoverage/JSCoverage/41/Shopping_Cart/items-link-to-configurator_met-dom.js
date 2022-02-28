
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
    addCartItemToDocument(item, img, i) {
        let price = 0;
        this.container.appendChild(createCartItem(item, img, i));

        function createCartItem(item, img, i) {
            return DOM.containerWithAttributes([
                DOM.containerWithAttributes([
                    DOM.containerWithAttributes([
                        createImgItem(item),
                    ], {href: "/config.html?objectID="+item.objectID+"&printSize="+item.printSize+"&frameStyle="+item.frameStyle+"&frameWidth="+item.frameWidth+"&matColor="+item.matColor+"&matWidth="+item.matWidth}, "a")
                ], {className: "cart-preview", id: "preview-container-" + i}, "div"),
                DOM.containerWithAttributes([
                    createCartLabelDivItems(),
                    createPriceElem(),
                    DOM.containerWithAttributes([], {className: "cart-remove", id: i}, "button")
                ], {className: "museum-label"}, "div"),
            ], {className: "cart-item"}, "div");
        }

        function createPriceElem() {
            price = Frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);

            let p = document.createElement("div");
            p.setAttribute("class", "cart-price");
            p.innerHTML = "\u20AC ";

            let t = document.createElement("span");
            t.setAttribute("id", "price-" + i);
            t.innerHTML = price.toFixed(2);
            p.appendChild(t);

            return p;
        }

        function createImgItem() {
            let image = DOM.containerWithAttributes([], {
                src: img.primaryImage,
                alt: img.title,
                id: "object-image-" + i
            }, "img");

            return image;
        }

        function createCartLabelDivItems() {
            return DOM.container([
                createSpanItem("artist", img.artistDisplayName),
                createSpanItem("title", img.title + ", "),
                createSpanItem("date", img.objectDate),
                DOM.container([], "br"),
                DOM.container([], "br"),
                createSpanItem("frame-description", "")
            ]);
        }

        function createSpanItem(className, innerText) {
            let container = DOM.containerWithAttributes([], {className: className}, "span");
            if (className === "frame-description") {
                let size = "";
                if (item.printSize === "S") {
                    size = "Small";
                } else if (item.printSize === "M") {
                    size = "Medium";
                } else if (item.printSize === "L") {
                    size = "Large";
                }

                if (item.matWidth == "0")  else {
                    container.innerText = `${size} print in a ${item.frameWidth/10} cm ${item.frameStyle} frame with a ${item.matWidth/10} cm ${item.matColor} mat.`;
                }
            } else {
                container.innerText = innerText;
            }
            return container;
        }

        return price;
    }

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
