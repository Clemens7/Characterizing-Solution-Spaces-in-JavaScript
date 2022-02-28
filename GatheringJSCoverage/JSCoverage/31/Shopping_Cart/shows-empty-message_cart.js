import * as Search from './search.js';
import * as Frame from './frame.js';
import { removeEntry, numberOfEntries, getAllEntries } from './cart-storage.js';




class ShoppingCartItem {
    
}
class ShoppingCartItem2 {
    
}

const sizeDesc = {
    S: 'Small',
    M: 'Medium',
    L: 'Large'
};

document.addEventListener('DOMContentLoaded', event => {
    const numberOfCartItems = numberOfEntries();
    const cartLink = document.getElementById('cart-link');
    cartLink.innerText = `Cart (${numberOfCartItems})`;
    loadCartItems();
});

function loadCartItems() {
    const items = getAllEntries();
    if (!items || items.length == 0) {
        const button = document.getElementById('checkout-button');
        button.disabled = true;
    }
    cartSearch(items);
}

function createMessageElement() {
    const message = document.createElement('h2');
    message.innerText = 'There are no items in your shopping cart.';
    return message;
}


const button = document.getElementById('checkout-button')
button.addEventListener('click', );

export async function cartSearch(entries) {

    const sciContainer = new SciDocumentContainer();
    sciContainer.clear();
    let totalP = 0;
    //calculate price
    if (entries.length === 0) {
        const message = document.getElementById('cart');
        message.appendChild(createMessageElement());
    }
    for (let index in entries) 
    document.getElementById('price-total').innerText = totalP;
}

export class SciDocumentContainer {
    constructor(containerID = 'cart') {
        this.container = document.getElementById(containerID);
        if (!this.container) 
    }

    clear() {
        this.container.innerHTML = '';
    }

    



}

