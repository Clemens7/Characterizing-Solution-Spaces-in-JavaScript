import * as DOM from './dom-helpers.js';
import { FramedPicture, calculateTotalCartPrice, cartIsEmpty } from './config.js';
import { FrameConfiguration } from './config.js';
import { render } from './frame.js';

export 

export class CartDocumentContainer {
    constructor(containerID='cart', priceTag='price-total', checkoutButton='checkout-button') {
        this.container = document.getElementById(containerID);
        this.priceTag = document.getElementById(priceTag);
        this.emptyCartMessage = document.createElement('h1');
        this.emptyCartMessage.innerText = "There are no items in your shopping cart.";
        this.checkoutButton = document.getElementById(checkoutButton);
        if(!this.container) 
    }

    
    

    

    async displayCartItems() {
        const itemsTemp = await FramedPicture.loadFromLocalStorage();
        const items = itemsTemp.reverse();
        let totalPrice = 0.0;
        if (Object.keys(items).length === 0) 
        else {
            this.checkoutButton.disabled = false;
            let i = items.length-1;
            for (let item of items) {
                this.container.prepend(createCartItem(item, i));
                window.addEventListener('onload',
                render(document.getElementById(`preview-${item.picture.objectID}`),
                    document.getElementById(`container-${item.picture.objectID}`),
                    item.config.printSize, item.config.frameStyle, item.config.frameWidth, item.config.matColor, item.config.matWidth)
                );
                totalPrice += item.config.price;
                i--;
            }
        this.priceTag.innerText = totalPrice.toFixed(2);
        }




        function createCartItem(item, i) {
            const cartItem = document.createElement('div');
            const configLink = `./config.html?objectID=${item.picture.objectID}&printSize=${item.config.printSize}&frameStyle=${item.config.frameStyle}&frameWidth=${item.config.frameWidth}&matColor=${item.config.matColor}&matWidth=${item.config.matWidth}`;
            cartItem.setAttribute('class', 'cart-item');
            cartItem.innerHTML =   `<div class="cart-preview" id="preview-container-${item.picture.objectID}">
                                    <a href="${configLink}" id="container-${item.picture.objectID}">
                                        <img class="cart-thumb" src="${item.picture.primaryImageSmall}" id="preview-${item.picture.objectID}" alt="${item.picture.title}">
                                    </a>
                                </div>
                                <div class="museum-label">
                                    <div>
                                        <span class="artist">${item.picture.artistDisplayName}</span>
                                        <span class="title">${item.picture.title}</span>,
                                        <span class="date">${item.picture.objectDate}</span>
                                        <br><br>
                                        <span class="frame-description">${createFrameDescription(item.config)}</span>
                                    </div>
                                    <div class="cart-price">€ <span id="price-0">${item.config.price.toFixed(2)}</span></div>
                                    <button class="cart-remove" id="remove-${i}"></button>
                                </div>`;
            return cartItem;
        }

        function createFrameDescription(config) {
            const sizes = {'S': 'Small', 'M': 'Medium', 'L': 'Large'}

            let desc =`${sizes[config.printSize]} print in a ${config.frameWidth / 10}&nbsp;cm ${config.frameStyle} frame`;
            if (config.matWidth > 0) {
                desc += ` with a ${config.matWidth / 10}&nbsp;cm ${config.matColor} mat.`
            }
            else {
                desc += '.';
            }
            return desc;
        }
    }
}

export class SearchResultDocumentContainer {
    

    

    
}
