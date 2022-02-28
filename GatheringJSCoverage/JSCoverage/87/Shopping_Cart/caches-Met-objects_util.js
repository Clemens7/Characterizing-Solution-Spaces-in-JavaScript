import * as Model from './models.js';

export 

export 

export 

export 

export function showCartNumber() {
    const cart = Model.retrieveCart();
    const cartNum = cart.items.length;
    const cartLink = document.getElementById("cart-link");
    if(cartNum <= 0) else {
        cartLink.innerText = `Cart (${cartNum})`;
    }
    console.log(cart.items.length);

    
}


export 