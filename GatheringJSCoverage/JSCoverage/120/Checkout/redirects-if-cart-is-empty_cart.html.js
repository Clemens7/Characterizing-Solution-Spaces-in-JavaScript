
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
    if ("cart" in window.localStorage) 

    if (!cart) {
        let cart_elem = document.getElementById("cart");
        cart_elem.insertBefore(DOMHelper.innerTextElement("There are no items in your shopping cart.", "span"), cart_elem.firstChild);
        document.getElementById("checkout-button").disabled = true;
    }

    let total_price = 0.0;

    if(cart)

    document.getElementById("price-total").innerText = total_price.toFixed(2);
  