import * as Frame from './frame.js';
import {cartCache} from "./search-cache.js"; //Shows the amount of the Cart

document.addEventListener('DOMContentLoaded', async () => {
  try {
      await createCart(JSON.parse(localStorage['cart']));
  }
  
  await cartCache();

  //Event for removing an Cart-Object via the X-Button
   let removeButton = document.getElementsByClassName("cart-remove");
   for(let buttons = 0; buttons < removeButton.length; buttons++) {
     removeButton[buttons].addEventListener("click", , false);
   }

  //Checkout-Button
   let checkoutButton = document.getElementById("checkout-button");
   checkoutButton.addEventListener("click", )
})

//Fetch Data from the API via the objectID
import {retrieveData} from "./search-api.js";
function getData(data){
    return retrieveData(data.objectID);
}

//Creates the cart.html file with the recieved Cart-Items
async function createCart(data){
    const div = document.getElementById('cart');
    if (data.length < 1) 
    else {
        let apiData;
        for (let q = data.length-1; q >= 0; q--) { //displays the most recent added on top
            apiData = await getData(data[q]);
            div.appendChild(await createCartItem(data[q], apiData));
            Frame.render(document.getElementById("preview-"+data[q].objectID), document.getElementById("preview-container-"+data[q].objectID), data[q].printSize, data[q].frameStyle, data[q].frameWidth, data[q].matColor, data[q].matWidth);
        }
        div.appendChild(createTotalPrice(data));
    }
}

//Creates the Cart-Items for createCart
async function createCartItem(data, apiData){
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML =
        `<div class="cart-preview" id="preview-container-${data.objectID}">
        <a href="${linkBuilder(data)}">
        <img class="cart-thumb" src="${apiData.primaryImageSmall}" id="preview-${data.objectID}" alt="${apiData.title}">
        </a>
        </div>
        <div class="museum-label">
        <div>
        <span class="artist">${apiData.artistDisplayName}</span>
        <span class="title">${apiData.title},</span>
        <span class="date">${apiData.objectDate}</span>
        <br><br>
        <span class="frame-description">${descriptionBuilder(data)}</span>
        </div>
        <div class="cart-price">€ <span id="price-${data.objectID}">${calcPrice(data)}</span></div>
        <button class="cart-remove"></button>
        </div>`;
    return div;
}

//Builds a link with the frame-configuration to link to the corresponding frame-configuration page.
function linkBuilder(data){
    return "/config.html?objectID=" + data.objectID + "&printSize=" + data.printSize + "&frameStyle=" + data.frameStyle +
        "&frameWidth=" + data.frameWidth + "&matColor=" + data.matColor + "&matWidth=" + data.matWidth;
}

//Builds a frame-description String for the HTML
function descriptionBuilder(data){
    let size = "";
    if (data.printSize === "S"){ size = "Small"; }
    if (data.printSize === "M")
    if (data.printSize === "L") { size = "Large"; }

    let mat = "";
    if (parseFloat(data.matWidth) === 0) 
    if (parseFloat(data.matWidth) > 0) { mat = " with a " + data.matWidth/10 + " cm " + data.matColor + " mat."; }

    return size + " print in a " + data.frameWidth/10 + " cm " + data.frameStyle + " frame" + mat;
}

//Creates the Total-Price for createCart
function createTotalPrice(data){
    const div = document.createElement("div");
    div.className = "cart-total";
    div.innerHTML =
    `<div class="price">Total: € <span id="price-total">${calcTotalPrice(data)}</span></div>
    <button type="button" id="checkout-button">Checkout</button>`;
    return div;
}

//Calculates the price for an Cart-Item
function calcPrice (data){
    return Frame.calculatePrice(data.printSize, data.frameStyle, data.frameWidth, data.matWidth).toFixed(2);
}

//Calculates the total price
function calcTotalPrice(data){
    let sum = 0;
    if (data !== undefined) {
        for (let datas of data) {
            sum += parseFloat(calcPrice(datas));
        }
        return sum.toFixed(2);
    }
}

//Returns the HTML-Message for an empty Cart
