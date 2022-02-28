import * as Frame from './frame.js';

export 

export function getItems() {
    let cart = localStorage.getItem('cart');
    if (!cart) 
    return JSON.parse(cart);
}

export 

export function getTotal() {
    let items = getItems();
    return items.reduce((current, item) => {
      return current + Frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    }, 0.0);
}

export 