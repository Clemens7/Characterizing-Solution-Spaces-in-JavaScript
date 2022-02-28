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

    

    addCartItemToDocument(cartItem, thumb, index) {



        const item = this.container.appendChild(createCartItemElement(cartItem, thumb, index));
        item.onload = renderPreviewImage();

        function renderPreviewImage() {
            const previewImageElement = new PreviewImageDocumentElement(index);

            previewImageElement.setImageSource(thumb.primaryImage).then(() =>
                Frame.render(
                    previewImageElement.element,
                    document.getElementById('preview-container-' + index),
                    cartItem.printSize,
                    cartItem.frameStyle,
                    cartItem.frameWidth,
                    cartItem.matColor,
                    cartItem.matWidth
                ));
        }

        function createCartItemElement(cartItem, thumb, index) {
            let div = DOM.container([
                createCartPreview(cartItem, thumb, index),
                createMuseumLabel(cartItem, thumb)
            ], 'div');
            return DOM.addCSSClass(div, ["cart-item"]);
        }

        function createCartPreview(cartItem, thumb, index) {
            let div = DOM.container([
                createLink(cartItem, thumb, index)
            ], 'div');

            return DOM.setAttributes(div, { id: "preview-container-" + index, className: "cart-preview" });
        }

        function createLink(cartItem, thumb, index) {
            let a = DOM.container([
                createImage(cartItem, thumb, index)
            ], 'a');
            return DOM.setAttributes(a, { href: `${CartService.getConfigLink(thumb, cartItem)}` });
        }

        function createImage(cartItem, thumb, index) {
            let img = DOM.setAttributes(document.createElement('img'), {
                src: thumb.primaryImage,
                alt: thumb.title,
                id: "preview-" + index,

            });
            return DOM.addCSSClass(img, ["cart-thumb"]);
        }

        function createMuseumLabel(cartItem, thumb) {
            var remove_button = document.createElement('button');
            DOM.addCSSClass(remove_button, ["cart-remove"]);
            remove_button.addEventListener("click", function(event) {
                console.log(`remove: ${cartItem.objectID}`);
                removeFromCart(index);
            });


            let div = DOM.container([
                createLabelDescription(cartItem, thumb),
                createCartPrice(cartItem),
                remove_button
            ], 'div');
            return DOM.addCSSClass(div, ["museum-label"]);
        }

        function createLabelDescription(cartItem, thumb) {
            let div = DOM.container([
                DOM.addCSSClass(DOM.textElement('span', thumb.artistDisplayName), ["artist"]),
                DOM.addCSSClass(DOM.textElement('span', thumb.title), ["title"]),
                document.createTextNode(", "),
                DOM.addCSSClass(DOM.textElement('span', thumb.objectDate), ["date"]),
                DOM.addCSSClass(document.createElement('br'), []),
                DOM.addCSSClass(document.createElement('br'), []),
                // TODO: add frame description
                DOM.addCSSClass(DOM.textElement('span', `${Frame.describeFrame(cartItem)}`), ["frame-description"])
            ], 'div');
            return div;
        }

        function createCartPrice(cartItem) {
            let div = DOM.container([
                // Cart item price calculation
                document.createTextNode("€ "),
                DOM.setAttributes(DOM.textElement('span', `${Frame.calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth)}`), { id: "price-" + cartItem.objectID })
            ], 'div');
            return DOM.addCSSClass(div, ["cart-price"]);
        }

        function removeFromCart(index) {
            console.log("removing " + JSON.stringify(item));

            CacheAPI.retrieveJsonAsync(CONSTANTS.CACHE_CART).then(cartData => {
                if (!cartData) 
                cartData.splice(index, 1);

                CacheAPI.storeJson(CONSTANTS.CACHE_CART, cartData);
                // Cart.displayCartItem();
                CartService.loadCartLink();
            });
        }
    }

    addCartTotalToDocument(cartItems) {

        this.container.appendChild(createCheckout(cartItems));

        function createCheckout(cartItems) {
            let b = document.createElement('button');
            b.innerHTML = "Checkout";
            b.type = "button";

            let div = DOM.container([
                createCartTotal(cartItems),
                DOM.setAttributes(b, { id: "checkout-button" })
            ], 'div');

            return DOM.addCSSClass(div, ["cart-total"]);
        }

        function createCartTotal(cartItems) {
            let span = document.createElement('span');
            span.innerHTML = `${Frame.calculateCartPrice(cartItems)}`;

            let div = DOM.container([
                document.createTextNode("Total: € "),
                DOM.setAttributes(span, { id: "price-total" }) //DOM.textElement('span', `${Frame.calculateCartPrice(cartItems)}`)
            ], 'div');
            return DOM.addCSSClass(div, ["price"]);
        }

    }
}

class PreviewImageDocumentElement {

    constructor(item) {
        let elementId = 'preview-' + item;
        this.element = document.getElementById(elementId);
        if (!this.element) 
    }

    async setImageSource(newSource) {
        return new Promise((resolve, reject) => {
            this.element.onload = resolve;
            this.element.onerror = reject;
            this.element.src = newSource;
        })
    }

}