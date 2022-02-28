import * as models from './models.js';
import * as frame from './frame.js';
import * as util from './util.js';
import * as cache from './metmuseumAPI.js';

let cart;
let template;
let cartItems;
let cartTotalPrice = 0;

cart = document.getElementById('cart');
template = getTemplate(cart, '.cart-item');
cartItems = models.retrieveCart();
setCartItemSize();
addCartItems(cartItems);
cartEmpty();

document.addEventListener('DOMContentLoaded', event => {
    //eventListenersForRemoveItem();
});

document.getElementById('checkout-button').addEventListener('click', );

function addCartItems(itemsObject) {
    let index = 0;
    itemsObject.items.forEach();
}









function getTemplate(cart, item) {
    let template = cart.querySelector(item);
    template.remove();

    return template;
}



function cartEmpty() {
    let cartItems = models.retrieveCart();
    if (cartItems.items.length === 0) {
        let temp = document.createElement('div');
        temp.textContent = 'There are no items in your shopping cart.';
        document.querySelector('#cart').prepend(temp);
        document.querySelector('#checkout-button').disabled = true;
    }
}

function setCartItemSize() {
    util.showCartNumber();
}

