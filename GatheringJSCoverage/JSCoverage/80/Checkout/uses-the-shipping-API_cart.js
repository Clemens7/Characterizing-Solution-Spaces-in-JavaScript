import * as Cache from './cache.js';
import {calculatePrice} from './frame.js';

export class Cart {

    constructor(items) {
        /** @type {CartItem[]} */
        this.items = items;
    }

    /**
     * Checks if the cart is empty or not
     * @returns {boolean}
     */
    isEmpty() {
        return this.getItemCount() === 0;
    }

    /**
     * Returns the number of items in the cart
     */
    getItemCount(){
        if(this.items === undefined)
            
        return this.items.length;
    }

    /**
     *
     * @param {CartItem} item
     */
    

    /**
     * calculates the total price for all items in euro cents
     * @returns {number} in euro cents
     */
    getTotalPrice() {
        let total = 0;
        this.items.map(item => {
            let itemPrice = calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
            total += itemPrice * 100;
        });
        return total;
    }
}