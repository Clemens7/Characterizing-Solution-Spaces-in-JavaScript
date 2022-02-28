import { calculatePrice } from  './frame.js';
export function getCartItemNumber(){
    let text;
    let counter = 0;
    if (!localStorage.getItem('cart')){
    text = "Cart";
    }

    document.getElementById("cart-link").innerHTML = text;
}

export 

export 