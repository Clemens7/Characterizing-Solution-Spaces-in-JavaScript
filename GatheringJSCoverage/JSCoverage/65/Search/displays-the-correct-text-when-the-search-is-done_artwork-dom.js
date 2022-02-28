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

    createSearchTextDone(term, numberResults) {
        if(numberResults == 1) 
        this.container.innerText = "Found " + numberResults + " artworks for “" + term + "”";
    }

    createSearchTextReset() {
        this.container.innerText = "Search our collection of more than 400,000 artworks.";
    }
}

export class CartItemContainer {
    

    

    
}