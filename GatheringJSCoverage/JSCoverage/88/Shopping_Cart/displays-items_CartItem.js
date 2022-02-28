import {calculatePrice} from './frame.js';

// -----------------------------------------------
// Class CartItem
// used to interact with cart Item
// get the current price for the cart Item with CartItem.getPrice
// -----------------------------------------------
export default class CartItem {

    // constructor
    constructor(objectID, printSize, frameStyle, frameWidth, matColor, matWidth) {
        this.objectID = objectID;
        this.printSize = printSize;
        this.frameStyle = frameStyle;
        this.frameWidth = frameWidth;
        this.matColor = matColor;
        this.matWidth = matWidth;
    }

    // get the current price based of the user selections
    getPrice() {
        return calculatePrice(this.printSize, this.frameStyle, this.frameWidth, this.matWidth);
    }
}