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
        const noOfItems = cart  : ''
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
    constructor(containerId = 'gallery') {
        this.container = document.getElementById(containerId);
        if (!this.container) 
    }

    /**
     * Clears the container
     */
    clear() {
        this.container.innerHTML = '';
    }

    /**
     * Adds a museum object to the container
     * @param museumObject object to be added
     */
    addMuseumObject(museumObject) {
        const child = document.createElement('div');
        child.className = 'thumb';
        child.innerHTML = `<a href="config.html?objectID=${museumObject.objectID}" id="${museumObject.objectID}">
            <img src="${museumObject.primaryImageSmall}" alt="${museumObject.title}" id="object-image-${museumObject.objectID}">
          <div class="museum-label">
            <span class="artist">${museumObject.artistDisplayName}</span>
            <span class="title">${museumObject.title}</span>,
            <span class="date">${museumObject.objectDate}</span>
          </div>
        </a>`;
        this.container.appendChild(child);
    }
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
