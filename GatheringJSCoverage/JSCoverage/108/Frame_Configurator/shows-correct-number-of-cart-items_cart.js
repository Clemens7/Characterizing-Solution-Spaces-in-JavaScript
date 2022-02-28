import * as DOM from './dom_helper.js';
import * as Frame from "./frame.js";
import * as API from './metropolitan_api.js';

export class Cart {
    static key = 'cart';

    static 

    static 

    static 

    static 

    static 

    static 

    static numberOfItems() {
        let cartString = localStorage[this.key];
        if (cartString) {
            return JSON.parse(cartString).length;
        }
    }
}

export class CartItem {
    constructor(itemID, objectID, printSize, frameStyle, frameWidth, matColor, matWidth) {
        this.objectID = objectID;
        this.printSize = printSize;
        this.frameStyle = frameStyle;
        this.frameWidth = frameWidth;
        this.matColor = matColor;
        this.matWidth = matWidth;
    }
}

export class CartContainer {
    

    

    

    

    

}

