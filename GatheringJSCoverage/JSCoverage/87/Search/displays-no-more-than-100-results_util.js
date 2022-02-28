import * as Model from './models.js';

export 

export 

export 

export 

export function showCartNumber() {
    const cart = Model.retrieveCart();
    const cartNum = cart.items.length;
    const cartLink = document.getElementById("cart-link");
    if(cartNum <= 0) {
        cartLink.innerText = "Cart";
    }
    console.log(cart.items.length);

    
}


export 