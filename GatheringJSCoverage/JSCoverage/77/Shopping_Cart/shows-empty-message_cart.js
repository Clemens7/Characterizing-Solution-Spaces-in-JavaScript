import * as Frame from '../frame.js';
import {PreviewContainer} from './cart-dom.js';
import * as SearchAPI from './search-api.js'
import {CART} from "./artmart-cache.js";
import {localPictures} from './artmart-cache.js ';

(function () {
    CART.init();
    console.log(CART);
    localPictures.init();
    if (CART.contents.length == 0) {
        noCartItemsHTML();
    }
})();






















function noCartItemsHTML() {
    let main = document.getElementsByTagName("main")[0];
    main.insertBefore(document.createElement("h2"), document.getElementById('cart'));
    document.getElementsByTagName("h2")[0].innerText = "There are no items in your shopping cart.";
    document.getElementById("checkout-button").setAttribute("disabled", "");
}

