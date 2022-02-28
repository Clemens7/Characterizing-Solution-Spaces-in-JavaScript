import * as Frame from "./frame.js";
import * as API from "./api-abstraction.js";
API.initCache();
import { load } from "./config.js";
export class cart {
  
}

const API_URL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/`;
export async function retrieve() {
  try {
    document.getElementById("checkout-button").disabled = true;
    let cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    var price = 0;
    if (cart.length == 0) 
    else {
      document.getElementById("message").innerHTML = '';
      document.getElementById("checkout-button").disabled = false;
      for (let item of cart) {
        console.log(item.objectID);
        //const response = await fetch(API_URL + item.objectID);
        //const rawData = await response.json();
        const responseData = await API.getItem(item.objectID);
        const cartItem = displayCartElement(responseData, item);
        const cartList = document.getElementById("cart");
        cartList.prepend(cartItem);

        const img = document.getElementById(`preview-${item.objectID}`);
        img.onload = (event) => {
          loadimage(img, cartItem, item);
        };

       // document.getElementById('config-linker').href='./config.html'+`?objectID=${item.objectID}&printSize=${item.printSize}&frameWidth=${item.frameWidth}&frameStyle=${item.frameStyle}&matWidth=${item.matWidth}&matColor=${item.matColor}`;
          //id, printSize, frameStyle, frameWidth, matColor, matWidth


        console.log(responseData);
        var itemPrice = Frame.calculatePrice(
          item.printSize,
          item.frameStyle,
          item.frameWidth,
          item.matWidth
        );
        const checkoutButton=document.getElementById("checkout-button");
        checkoutButton.onclick=;
        const removeButton = document.getElementById(`cart-remove-${item.objectID}`);
        console.log(removeButton);
        removeButton.onclick = ;
        price = price + itemPrice;

      }
      console.log(price);
    }
    document.getElementById("price-total").innerText = price;
    let cartlink = document.getElementById('cart-link');
    cart.length>0?cartlink.innerText = 'Cart (' + cart.length + ')';
  } 
}

function loadimage(img, cartItem, item) {
  console.log("load image");
  console.log(img);
  console.log(cartItem);
  console.log(item);
  Frame.render(
    img,
    cartItem,
    item.printSize,
    item.frameStyle,
    item.frameWidth,
    item.matColor,
    item.matWidth
  );
}

export function displayCartElement(responseData, item) {
  var printSize = size(item);
  var mat = matDescription(item);
  console.log("PrintSize: " + printSize);
  console.log("mat: " + mat);
  var itemPrice = Frame.calculatePrice(
    item.printSize,
    item.frameStyle,
    item.frameWidth,
    item.matWidth
  );
  console.log(itemPrice);
  const div = document.createElement("div");
  div.id = `cart-item-${item.objectID}`;
  div.classList.add("cart-item");
  div.innerHTML = `<div class="cart-preview" id="preview-container-${item.objectID}">
  <a href='./config.html?objectID=${item.objectID}&printSize=${item.printSize}&frameWidth=${item.frameWidth}&frameStyle=${item.frameStyle}&matWidth=${item.matWidth}&matColor=${item.matColor}'>   
    <img class="cart-thumb" src="${responseData.primaryImageSmall}" id="preview-${item.objectID}" alt="${responseData.title}" >
  </a>  
  </div>
  <div class="museum-label">
    <div>
      <span class="artist">${responseData.artistDisplayName}</span>
      <span class="title">${responseData.title}</span>,
      <span class="date">${responseData.objectDate}</span>
      <br><br>
      <span class="frame-description">${printSize} print in a ${item.frameWidth / 10.0} cm ${item.frameStyle} frame${mat}</span>
    </div>
    <div class="cart-price">€ <span id="price-0">${itemPrice}</span></div>
    <button class="cart-remove" id="cart-remove-${item.objectID}"></button>
  </div>`;
  return div;
}
function size(item) {
  var printSize;
  var mat;
  if (item.printSize.localeCompare("S") == 0) {
    printSize = "Small";
  }
  if (item.printSize.localeCompare("M") == 0) {
    printSize = "Medium";
  }
  if (item.printSize.localeCompare("L") == 0) 

  return printSize;
}
function matDescription(item) {
  let mat;
  if (item.matWidth == 0) 
  if (item.matWidth != 0) {
    mat = " with a " + item.matWidth / 10.0 + " cm " + item.matColor + " mat.";
  }
  return mat;
}

