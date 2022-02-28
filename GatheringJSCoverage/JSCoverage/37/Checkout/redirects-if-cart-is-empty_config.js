import { getPrintSizes, render, calculatePrice } from "./frame.js";

import { fetchObject } from "./search.js";

class Configurator {
    ;

    

    

    

    

    

    

    

    

    

    

    

    

    

    
}







async function cartCount() {

    if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", "[]");
    }

    /* show number of items in cart */
    const cart = JSON.parse(localStorage.getItem("cart"));
    let itemCount = cart.length;
	
	if (itemCount < 1) {
		document.getElementById("cart-link").innerText = 'Cart';
	}
}

export { Configurator, addToCart, cartCount }