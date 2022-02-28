import { cache } from "./cache.js";

export function displayCartNumber(){
    const items = cache.getCartItems();
    const cartLink = document.getElementById("cart-link");

    if(items.length > 0){
        cartLink.innerText = `Cart (${items.length})`
    }
}

displayCartNumber();