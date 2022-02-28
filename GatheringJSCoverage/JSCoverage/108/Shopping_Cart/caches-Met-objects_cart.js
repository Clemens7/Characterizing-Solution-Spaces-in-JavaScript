import * as DOM from './dom_helper.js';
import * as Frame from "./frame.js";
import * as API from './metropolitan_api.js';

export class Cart {
    static key = 'cart';

    static 

    static updateCartItemCounter() {
        document.getElementById("cart-link").innerText = `Cart ${Cart.numberOfItems() > 0
            ? `(${Cart.numberOfItems()})`
            }`;
    }

    static updateCartCurrentPrice() {
        console.log("clicked!");
        let items = Cart.getItems();
        let price = 0;
        for (let item of items) {
            price += Frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
        }

        if (price === 0)  else {
            document.getElementById("checkout-button").disabled = false;
            let empty_cart = document.getElementById("cart-empty");
            if (empty_cart) {
                empty_cart.remove();
            }
            document.getElementById("price-total").innerText = price.toFixed(2);
        }
    }

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

    async addItemToCart(item, id) {
        let cartElement = await this.createCartItemElements(item, id);
        this.container.prepend(cartElement);
        Cart.updateCartCurrentPrice();
        Cart.updateCartItemCounter();
    }

    async createCartItemElements(item, id) {

        const painting = await API.get_object_by_id(item.objectID);

        let imageContainer = DOM.imageElement(painting.image, "");

        imageContainer.alt = `${painting.artist}, ${painting.name}`;

        let img = imageContainer.getElementsByTagName("img");


        let linkContainer = DOM.container(
            [imageContainer] // <a href="">
            , "a");

        linkContainer.href = `config.html?objectID=${item.objectID}&printSize=${item.printSize}&frameWidth=${item.frameWidth}&frameStyle=${item.frameStyle}&matWidth=${item.matWidth}&matColor=${item.matColor}`;

        let previewContainer = DOM.container( // <div class="cart-preview">
            [linkContainer]
            , "div", "cart-preview");

        // Render preview with frame

        imageContainer.addEventListener('load', _ => {
            Frame.render(imageContainer, previewContainer, item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth);
        });
        imageContainer.setAttribute("class", "cart-thumb");
        var cart_remove_item = DOM.element("button", "cart-remove");
        cart_remove_item.id = id;

        cart_remove_item.onclick = ;

        return DOM.container([ // <div class="cart-item">
            previewContainer,
            DOM.container([ // <div class="museum-label">
                DOM.container([ // <div>
                    DOM.textElement("span", painting.artist, "artist"),
                    DOM.textElement("span", `${painting.name}, `, "title"),
                    DOM.textElement("span", painting.date, "date"),
                    document.createElement("br"), document.createElement("br"),
                    DOM.textElement("span",
                        `${this.generateFrameDescription(item)}`, "frame-description"),

                ], "div"),
                DOM.container([ // <div class="cart-price">
                    DOM.textElement("span", `€ ${Frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth).toFixed(2)}`)
                ], "div", "cart-price"),
                cart_remove_item,
            ], "div", "museum-label")
        ], "div", "cart-item");
    }

    generateFrameDescription(item) {
        let sizeText;
        switch (item.printSize) {
            case 'S':
                sizeText = 'Small';
                break;
            case 'M':
                sizeText = 'Medium';
                break;
            
            
        }

        let matText = '';
        if (item.matWidth !== 0) {
            matText = ` with a ${Number((item.matWidth / 10).toFixed(1))} cm ${item.matColor} mat`
        }

        return `${sizeText} print in a ${Number((item.frameWidth / 10).toFixed(1))} cm ${item.frameStyle} frame${matText}.`;
    }

}

