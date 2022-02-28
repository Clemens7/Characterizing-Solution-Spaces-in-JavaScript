import cartService from './services/cart_service.js';
import artCollectionService from "./services/art_collection_service.js";
import {calculatePrice, render} from './frame.js';

document.getElementById('checkout-button').onclick = ;

if (cartService.isEmpty) {
    document.getElementById('checkout-button').disabled = true;
}

const cartLinkCallback = (cart) => {
    const cartLink = document.getElementById('cart-link');
    if (cart.isEmpty) {
        cartLink.innerText = 'Cart';
    }
};

cartService.addCallback(cartLinkCallback);
