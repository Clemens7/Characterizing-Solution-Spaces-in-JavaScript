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
        if (Object.keys(items).length === 0) {
            this.container.prepend(this.emptyCartMessage);
            this.priceTag.innerText = '-';
            this.checkoutButton.disabled = true;
        }




        

        
    }
}

export class SearchResultDocumentContainer {
    

    

    
}
