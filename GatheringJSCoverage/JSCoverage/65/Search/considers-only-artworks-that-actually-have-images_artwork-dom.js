import { Artwork } from './Artwork.js';
import * as DOM from './dom-helpers.js';
import {setAttributes} from "./dom-helpers.js";
import {setAttributeClass} from "./dom-helpers.js";
import {cartItemDescription} from "./cart.js";
import {calculatePrice, render} from "./frame.js";

export class ArtworkDocumentContainer {
    

    

}

export 

export 

export 

export 

export class SearchTextContainer {
    constructor(containerID = 'search-info') {
        this.container = document.getElementById(containerID);
        if (!this.container) 
    }

    clear() {
        this.container.innerHTML = '';
    }
    createSearchTextSearching(term) {
        this.container.innerText = "Searching for “" + term + "”...";
    }

    

    
}

export class CartItemContainer {
    

    

    
}