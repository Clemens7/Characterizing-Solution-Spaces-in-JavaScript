import * as Frame from './frame.js';

export function cartItemsSize() {
  var cart = JSON.parse(localStorage.getItem('cart')) ;
  document.getElementById("cart-link").innerText = (cart.length > 0 ? "Cart (" + cart.length + ")" );
}

export function getCartItems() {  
  return JSON.parse(localStorage.getItem('cart')) ;
}

export 

export 

export async function getDivsForCartView() {
  var cartTag = document.getElementById("cart");
  var items = getCartItems();
  var total = 0;
  var item;
  
  for(let i=0; i < items.length; i++) {
    var frameDescription;
    
    item = items[i];
    var itemData = await getObject(item.objectID);
    
    var divv = document.createElement("div");
    divv.classList.add("cart-item");
    
    if(item.printSize =='S') {
      frameDescription = 'Small';
    } else if(item.printSize == 'M') {
      frameDescription = 'Medium';
    }
    
    frameDescription += ' print in a ';
    frameDescription += item.frameWidth/10;
    frameDescription += '&nbsp;cm ';
    frameDescription += item.frameStyle;
    frameDescription += ' frame';
    
    if(item.matWidth > 0) {
      frameDescription += ' with a ';
      frameDescription += item.matWidth/10;
      frameDescription += '&nbsp;cm ';
      frameDescription += item.matColor;
      frameDescription += ' mat';
    }
    
    frameDescription += '.';
    
    var price = Frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    
    divv.innerHTML = `
      <div class="cart-preview" id="preview-container-${i}">
        <a href="config.html?${new URLSearchParams(item)}">
          <img class="cart-thumb" src="${itemData.primaryImageSmall}" id="preview-${i}" alt="${itemData.title}">
        </a>
      </div>
      <div class="museum-label">
        <div>
          <span class="artist">${itemData.artistDisplayName}</span>
          <span class="title">${itemData.title}</span>,
          <span class="date">${itemData.objectDate}</span>
          <br><br>
          <span class="frame-description">${frameDescription}</span>
        </div>
        <div class="cart-price">€ <span id="price-${i}">${price}</span></div>
        <button class="cart-remove" onclick="remove(${i});"></button>
      </div>`;
    
    cartTag.insertBefore(divv, cartTag.firstChild);
    
    var image = document.getElementById("preview-" + i);
    var containerTag = document.getElementById("preview-container-" + i);
    
    Frame.render(image, containerTag, item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth);
    
    total += price;
  }
  
  document.getElementById("price-total").innerHTML = `${total.toFixed(2)}`;
}

/*<!-- TODO: dynamically add cart items using template below -->
      <!--<div class="cart-item">
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
      </div>-->*/

export async function getObject(key) {
    let obj = JSON.parse(localStorage.getItem(key));
    if (!obj) {
        const objectUrl = "https://collectionapi.metmuseum.org/public/collection/v1/" + 'objects/' + key;
        obj = await fetch(objectUrl).then(data => data.json());
        if (!obj || obj.objectID == null) 
        localStorage.setItem(obj.objectID, JSON.stringify(obj));
    }
    return obj;
}