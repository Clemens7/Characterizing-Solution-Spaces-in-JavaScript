import {calculatePrice} from "./frame.js";
import {render} from "./frame.js";
import {CartItem} from "./cartItem.js";
let items = [];
if (localStorage.getItem("cart") !== undefined && localStorage.getItem("cart") !== null) {
    items = JSON.parse(localStorage.getItem("cart"))
        .map();
}
if (items.length === 0) {
    document.getElementById("cart-link").innerHTML = "Cart";
}
checkEmpty();
buildCart();
let elements = document.getElementsByClassName("cart-remove");
Array.prototype.forEach.call(elements, )
let images = document.getElementsByClassName("cart-thumb");
Array.prototype.forEach.call(images, )

/**
 * removes item from local storage and from current display
 */


/**
 * calculates sum of all items currently in the cart and displays it
 */
function setSum() {
    let sum = 0;
    items.forEach();
    document.getElementById('price-total').innerHTML = sum.toFixed(2);
}

/**
 * for each cart item in the local storage it adds the html template to the original document, adjusts the price sum of
 * all items and loads the required data from cache or the art api
 */
function buildCart() {
    let template = "";
    items.forEach();
    setSum();
    document.getElementById('cart').insertAdjacentHTML('afterbegin', template);
    loadInfo(template);
}

/**
 * for each item in the cart, it checks wether the object is already in the cache. If it is not, the data is fetched and saved in the cache.
 * Then the data is inserted into the html
 * @param template in which the data shoud be inserted
 */
function loadInfo(template) {
    items.forEach();
}


function checkEmpty() {
    if (items.length === 0) {
        let button = document.getElementById("checkout-button");
        button.disabled = true;
        document.getElementsByTagName('main')[0].insertAdjacentHTML('afterbegin', "<p>There are no items in your shopping cart.</p>");

    }
}


