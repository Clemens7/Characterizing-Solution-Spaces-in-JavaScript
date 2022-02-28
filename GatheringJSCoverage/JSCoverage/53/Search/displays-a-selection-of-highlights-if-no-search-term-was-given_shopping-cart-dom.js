import {
  ShoppingCartItem
} from './shopping-cart.js';

import * as DOM from './dom-helpers.js';
import * as Frame from './frame.js';
import * as ShoppingCartStorage from './shopping-cart-storage.js';
import * as MetmuseumAPI from './metmuseum-api.js';

export class ShoppingCartDOM {
  constructor(items) {
    this.items = items;
    this.containerId = 'cart';
  }

  updateCartLink() {
    const cartLink = document.getElementById('cart-link');

    if (this.items )  else {
      cartLink.innerText = `Cart`;
    }
  }

  

  

  

  

  

  

  

  

  

  
}
