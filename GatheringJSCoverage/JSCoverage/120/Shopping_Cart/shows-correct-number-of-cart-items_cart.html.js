
    import {Picture} from './picture.js';
    import * as FrameHelper from './frame.js';
    import * as DOMHelper from './dom-helpers.js';
    import * as PictureAPI from './picture-api.js';
    import * as Storage from './picture-storage.js';
    import * as CartHelper from './cart.js';
    const sizeDict = {
        S: "Small",
        M: "Medium",
        L: "Large"
    };

    document.getElementById("cart-link").innerText = CartHelper.getCartString();

    let checkout_button = document.getElementById("checkout-button");
      checkout_button.addEventListener("click", );

    let cart = null;
    if ("cart" in window.localStorage) {
      cart = Storage.get("cart");
    }

    if (!cart) 

    let total_price = 0.0;

    if(cart){
    for (let i=0; i<cart.length; i++) 

    document.getElementById("price-total").innerText = total_price.toFixed(2);
  