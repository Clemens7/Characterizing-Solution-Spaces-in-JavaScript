import {calculatePrice, render} from './frame.js';

window.onload = async function() {
    await fillCart();};

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



async function fillCart() {
    const shoppingCart = getShoppingCartFromLocalStorage();
    const cartElement = document.getElementById('cart');
    let totalPrice = 0;

    for (const item of shoppingCart) 

    const cartTotalElement = document.createElement('div');
    cartTotalElement.setAttribute('class', 'cart-total');

    const totalPriceDiv = document.createElement('div');
    totalPriceDiv.setAttribute('class', 'price');
    totalPriceDiv.appendChild(document.createTextNode('Total: € '));

    const totalPriceSpan = document.createElement('span');
    totalPriceSpan.setAttribute('id', 'price-total');
    totalPriceSpan.appendChild(document.createTextNode(totalPrice.toString()));
    totalPriceDiv.appendChild(totalPriceSpan);

    const checkoutButton = document.createElement('button');
    checkoutButton.setAttribute('type', 'button');
    checkoutButton.setAttribute('id', 'checkout-button');
    checkoutButton.appendChild(document.createTextNode('Checkout'));

    checkoutButton.onclick = ;

    if (!shoppingCart.length) {
        cartElement.appendChild(document.createTextNode("There are no items in your shopping cart."));
        checkoutButton.setAttribute('disabled', 'true');
    }}










export 
