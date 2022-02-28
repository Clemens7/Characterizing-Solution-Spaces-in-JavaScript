import * as FrameMethods from './frame.js';

let configList = JSON.parse(localStorage.getItem('cart'));
var imgList = []; //list of json object form api
let price_total = 0;
var checkoutActive;
const API_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";



async function getData() {
    console.log("load data");
    let configList = JSON.parse(localStorage.getItem('cart'));
    if (configList == null ) {
        let cart = document.getElementById("cart");
        console.log("null elements to display")
        cart.append('<p>There are no items in your shopping cart.</p>');
        checkoutActive = false;
        console.log("Cart is empty.")
    }
    addCartTotal('cart', "div", "cart-total");
}

function addCartTotal(parentID, elementTag, itemClass) {
    let cart = document.getElementById(parentID);
    if (cart === null) 

    let cart_total = document.createElement(elementTag);
    cart_total.setAttribute('class', itemClass);

    let price_div = document.createElement('div');
    price_div.setAttribute("class", "price");
    price_div.innerText = "Total: €";

    let total_price = document.createElement('span');
    total_price.setAttribute("id", "price-total");
    total_price.innerText = "" + price_total;
    price_div.append(total_price);

    let checkout_anchor = document.createElement("a");
    checkout_anchor.setAttribute("href", "checkout.html");
    //checkout_anchor.setAttribute("onclick", "return maybeEnableCheckout)");

    let checkout_btn = document.createElement("button");
    checkout_btn.setAttribute("type", "button");
    checkout_btn.setAttribute("id", "checkout-button");
    checkout_btn.setAttribute("disabled", maybeEnableCheckout);
    checkout_btn.innerText = "Checkout";
    checkout_anchor.append(checkout_btn);

    cart_total.append(price_div);
    cart_total.append(checkout_anchor);
    cart.append(cart_total);
}

window.onload = function () {
    getData();
}

window.displayElement = displayElement;
















window.maybeEnableCheckout = maybeEnableCheckout;





