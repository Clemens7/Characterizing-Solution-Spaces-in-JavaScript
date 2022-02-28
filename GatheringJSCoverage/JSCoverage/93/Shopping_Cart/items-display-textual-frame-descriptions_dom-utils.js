/**
 * Utility classes for DOM manipulation
 */
import * as LocalStorage from './cache.js';


export class CartItemsElement {
    constructor(elementId = 'cart-link') {
        this.element = document.getElementById(elementId);
        if (!this.element) 
    }

    update() {
        const cart = LocalStorage.get("cart");
        const noOfItems = cart && cart.length != 0 ? ` (${cart.length})` 
        this.element.innerText = `Cart${noOfItems}`;
    }
}

/**
 * Utility class for search.html
 */
export class SearchDocumentContainer {
    /**
     * @param containerId html id of the container
     */
    

    /**
     * Clears the container
     */
    

    /**
     * Adds a museum object to the container
     * @param museumObject object to be added
     */
    
}

/**
 * Utility class for cart.html
 */
export class CartDocumentContainer {
    /**
     * @param containerId html id of the container
     */
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) 
    }

    /**
     * Clears the container
     */
    clear() {
        const elements = document.getElementsByClassName("cart-item");
        while (elements.length > 0) 
    }

    /**
     * Adds a cart item to the container
     * @param cart item to be added
     * @param cartItemLocalStorage to be added
     * @param price to be added
     * @param counter to be added
     */
    addCartItemToContainer(cart, cartItemLocalStorage, price, counter, configItem) {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        cartItem.innerHTML =
            `<div class="cart-preview" id="preview-container-${counter}">
          <a href="config.html?objectID=${cart.objectID}&frameWidth=${configItem.frameWidth}&frameStyle=${configItem.frameStyle}&matWidth=${configItem.matWidth}&matColor=${configItem.matColor}&printSize=${configItem.printSize}">
            <img class="cart-thumb" src="${cart.primaryImageSmall}" alt="${cart.title}" id="object-image-${counter}">
          </a>
        </div>
        <div class="museum-label">
          <div>
            <span class="artist">${cart.artistDisplayName}</span>
            <span class="title">${cart.title}</span>,
            <span class="date">${cart.objectDate}</span>
            <br><br>
            <span class="frame-description">${configItem.printSize === 'L' ? 'Large' : configItem.printSize === 'M'  : 'Small'} print in a 
                                            ${parseFloat(configItem.frameWidth)/10} cm ${configItem.frameStyle} frame${parseFloat(configItem.matWidth) === 0 ? '' : ` with a 
                                            ${parseFloat(configItem.matWidth)/10} cm ${configItem.matColor} mat`}.</span>
          </div>
          <div class="cart-price">€ <span id="price-0">${price}</span></div>
          <button class="cart-remove"></button>
        </div>`;

        this.container.insertBefore(cartItem, this.container.childNodes[0]);
        return cartItem;
    }
}
