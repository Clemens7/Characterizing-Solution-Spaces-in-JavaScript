import {calculatePrice, render} from './frame.js';

window.onload = ;

export 

export 

export function getShoppingCartFromLocalStorage() {
    const cartInLocalStorage = localStorage.getItem('cart');
    if (cartInLocalStorage) {
        const parsedCartInLocalStorage = JSON.parse(cartInLocalStorage);
        if (typeof parsedCartInLocalStorage === typeof []) {
            return parsedCartInLocalStorage;
        }
    }}














export 
