import {render} from "./frame.js";
import {calculatePrice} from "./frame.js";
import {getPrintSizes} from "./frame.js";

const baseURL = "https://collectionapi.metmuseum.org";
const objURL = "/public/collection/v1/objects/";
const thisURL = new URL(document.location);

let cartList = JSON.parse(localStorage.getItem('cart'));

let cartSection = document.getElementById("cart");
let totalPrice = document.getElementById("price-total");
let checkoutBtn = document.getElementById("checkout-button");
let previewContainer;
let imgPreview;
let price;

let cartLink = document.getElementById("cart-link");

function setCartNumber(){
    if (cartList){
        cartLink.innerHTML = "Cart (" + cartList.length + ")";
    }
}

setCartNumber();


//creates a html preview for every element in 'cart'
async function showCart(){
    for(let itemIndex = 0; itemIndex < cartList.length; itemIndex++) {
        console.log("entered the for");
        const cartItem = cartList[itemIndex];

        let data = null;
        let cache = window.localStorage;
        if(cache.getItem(cartItem.objectID)){
            preData = cache.getItem(cartItem.objectID);
            data = JSON.parse(preData);
        }}
if(cartList){
    showCart()
    .then(console.log("shown"))
    .catch(console.log("not working"));
}



















/* html for cart-item
<div class="cart-item">
        <div class="cart-preview" id="preview-container-0">
          <a href="">
            <img class="cart-thumb" src="" id="preview-0" alt="">
          </a>
        </div>
        <div class="museum-label">
          <div>
            <span class="artist"></span>
            <span class="title"></span>,
            <span class="date"></span>
            <br><br>
            <span class="frame-description"></span>
          </div>
          <div class="cart-price">€ <span id="price-0">0</span></div>
          <button class="cart-remove"></button>
        </div>
      </div>
*/