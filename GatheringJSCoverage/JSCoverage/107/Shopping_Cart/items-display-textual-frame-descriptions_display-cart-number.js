import { retrieveFromStorage } from './art-cache.js';


export async function countCartItems(){
    let cartItems = retrieveFromStorage(['cart']);
    let cartCount = 0;
    if(cartItems){
        cartCount = cartItems.length;
        document.getElementById("cart-link").innerHTML = `Cart (${cartCount})`;
    return cartCount;
    }