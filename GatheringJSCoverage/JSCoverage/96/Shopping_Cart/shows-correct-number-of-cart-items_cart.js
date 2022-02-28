import { getPrintSizes, render, calculatePrice ,getItemPrintDesc} from '../../frame.js';
import { getQueryVariables, removeCartItem, getCartItems, getArtworkMetadata } from '../util.js';

const queryParameters = getQueryVariables();

const INPUT_LIST = {
    cart: document.getElementById('cart'),
    cartTotal: document.getElementById("div-cart-total")
};

var testCartItem = {
    objectID: 123,
    image: {},
    size: "S",
    frameStyle:"natural",
    frameWidth:5.0,
    matColor:"wine",
    matWidth:5.1
};

initCart();

function initCart() {
    updateCartView()
}

function updateCartItemsCounter() {
    if(getCartItems().length > 0)else{
        document.getElementById("cart-link").innerHTML = "Cart";
    }
}

function updateCheckoutButton() {
    document.getElementById("checkout-button").disabled = getCartItems().length <= 0;
}



function updateCartItems() {
    let cartTotal = INPUT_LIST.cartTotal;
    INPUT_LIST.cart.innerHTML = "";
    getCartItems().reverse().forEach();
    INPUT_LIST.cart.appendChild(cartTotal);
}



function updateCartView() {
    updateCartItems();
    updateCartItemsCounter();
    updateTotalPrice();
    updateCheckoutButton();
}

export 

function updateTotalPrice() {
    const cartItems = getCartItems();
    if(cartItems.length < 1){
        document.getElementById("price-total").innerText = "There are no items in your shopping cart.";
        document.getElementById("price-pretext").innerText = "";
    }
}

