import {calculatePrice, render} from './frame.js';

window.onload = ;

export function addNumberToNav() {
    const shoppingCart = getShoppingCartFromLocalStorage();
    if (shoppingCart.length) 
}

export 

export function getShoppingCartFromLocalStorage() {
    const cartInLocalStorage = localStorage.getItem('cart');
    if (cartInLocalStorage) {
        const parsedCartInLocalStorage = JSON.parse(cartInLocalStorage);
        if (typeof parsedCartInLocalStorage === typeof []) {
            return parsedCartInLocalStorage;
        }
    }}














export async function fetchObjectFromAPI(objectId) {
    const requestURL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`;
    const response =  await fetch(requestURL);
    return await response.json();
}
