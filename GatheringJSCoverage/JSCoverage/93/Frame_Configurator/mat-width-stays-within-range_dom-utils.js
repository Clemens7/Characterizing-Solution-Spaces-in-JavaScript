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
        const noOfItems = cart && cart.length != 0  : ''
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
    

    /**
     * Clears the container
     */
    

    /**
     * Adds a cart item to the container
     * @param cart item to be added
     * @param cartItemLocalStorage to be added
     * @param price to be added
     * @param counter to be added
     */
    
}
