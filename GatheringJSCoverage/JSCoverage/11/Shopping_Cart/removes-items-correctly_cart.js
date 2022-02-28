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
        if(cache.getItem(cartItem.objectID)) else {
            data = await fetchResults(baseURL + objURL + cartItem.objectID);
            cache.setItem(cartItem.objectID, JSON.stringify(data));
        }


        let frameDesc = generateFrameDesc(cartItem);

        let itemPreview = `<div class="cart-item" id="${itemIndex}">
                            <div class="cart-preview" id="preview-container-0">
                                <a href="${"config.html?objectID=" + cartItem.objectID + "&printSize=" + cartItem.printSize + "&frameStyle=" + cartItem.frameStyle + "&frameWidth=" + cartItem.frameWidth + "&matColor=" + cartItem.matColor + "&matWidth=" + cartItem.matWidth}">
                                    <img class="cart-thumb" src="${data.primaryImageSmall}" id="preview-0" alt="${data.title}">
                                </a>
                            </div>
                            <div class="museum-label">
                                <div>
                                    <span class="artist">${data.artistDisplayName}</span>
                                    <span class="title">${data.title}</span>,
                                    <span class="date">${data.objectDate}</span>
                                    <br><br>
                                    <span class="frame-description">${frameDesc}</span>
                                </div>
                                <div class="cart-price">€ <span id="price-0">0</span></div>
                                <button class="cart-remove" type="button" id="cart-remove-${itemIndex}"></button>
                            </div>
                           </div>`;

        cartSection.insertAdjacentHTML("afterbegin", itemPreview);
        setEventListener(itemIndex);
        showItem(cartItem);

    }
}
if(cartList){
    showCart()
    .then(console.log("shown"))
    .catch(console.log("not working"));
}
function setEventListener(itemID){
    let btnID = "cart-remove-" + itemID;
    let deleteButton = document.getElementById(btnID);
    deleteButton.addEventListener('click', function(){deleteCartItem(itemID)});
}

function generateFrameDesc(cartItem){
    let itemDesc = "";

    switch(cartItem.printSize){
        case 'S':
            itemDesc = "Small print in a ";
            break;
        case 'M':
            itemDesc = "Medium print in a ";
            break;
        case 'L':
            itemDesc = "Large print in a ";
            break;
    }

    itemDesc += (cartItem.frameWidth/10) + " cm " + cartItem.frameStyle + " frame";

    if(cartItem.matWidth === 0) else {
         return itemDesc + " with a " + (cartItem.matWidth/10) + " cm " + cartItem.matColor + " mat.";
    }
}

function showItem(cartItem){
previewContainer    = document.getElementById("preview-container-0");
imgPreview          = document.getElementById("preview-0");
price               = document.getElementById("price-0");

    console.log(cartItem);
    imgPreview.addEventListener('load', ()=> render(imgPreview, previewContainer, cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matColor, cartItem.matWidth));
    let itemPrice = calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth);
    price.innerHTML = itemPrice;
    calculateTotal(itemPrice);
}

function calculateTotal(itemPrice){
   let newPrice = +totalPrice.innerHTML + itemPrice;
   totalPrice.innerHTML = newPrice;
}

async function fetchResults(url) {
  let result = await fetch(url);
  let data   = await(result.json());
  return data;
}

function deleteCartItem(itemID){
    //document.getElementById(itemID).remove();
    let deletedElement = cartList.splice(itemID, 1);
    localStorage.setItem('cart', JSON.stringify(cartList));
    location.reload;
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