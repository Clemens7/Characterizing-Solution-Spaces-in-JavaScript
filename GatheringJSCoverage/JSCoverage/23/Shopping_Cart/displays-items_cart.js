import { render, calculatePrice } from "./frame.js";
import { getGalleryItemFromObjectId } from "./search-api-calls.js";
import { getFromLocalStorage } from "./print-objects-cache.js";
import { getCartText } from "./header.js";

let cartItems = getFromLocalStorage();

if(cartItems === null || cartItems.length === 0)  else {

  renderCartItems();
  if (cartItems.length != 0 ) {
    checkOut();
  }

  function numerateCartItems(){
    for (var i = 0; i<cartItems.length; i++){
      cartItems[i].id = i;
    }
  }

  async function renderCartItems() {
    const cardSection = document.getElementById("cart");
    //cardSection.innerHTML = "";
    if (cartItems.length === 0 )
    for (var i = 0; i < cartItems.length; i++) {
      let item = await getGalleryItem(cartItems[i].objectID);
      numerateCartItems()
      cardSection.prepend(getCartItemHTML(i, item, cartItems[i]));
      let img = document.getElementById("preview-" + i);
      console.log(img);
      renderFrame(img, cartItems[i], i);
      let id = cartItems[i].id;
      deleteCartItem(id);
    }
    getPriceTotal();
  }

  function deleteCartItem(id){
    const submitBtn = document.getElementById(id);
    submitBtn.addEventListener("click", );
  }

  function getCartItemHTML(index, galleryItem, cartItem) {
    const card = document.createElement("div");
    card.classList.add("cart-item");
    card.setAttribute("id", "item-" + index);
    card.innerHTML = `<div class="cart-preview" id="preview-container-${index}">
              <a href="config.html?objectID=${cartItem.objectID}&printSize=${cartItem.printSize}&frameWidth=${cartItem.frameWidth}&frameStyle=${cartItem.frameStyle}&matWidth=${cartItem.matWidth}&matColor=${cartItem.matColor}">
                  <img
                  class="cart-thumb"
                  src="${galleryItem.primaryImage}"
                  id="preview-${index}"
                  alt=""
                  />
              </a>
              </div>
              <div class="museum-label">
              <div>
              <span class="artist">${galleryItem.artistDisplayName}</span>
              <span class="title">${galleryItem.title}</span>,
              <span class="date">${galleryItem.date}</span>
                  <br /><br />
                  <span class="frame-description">${buildConfigurationDescription(
                    cartItem
                  )}</span>
              </div>
              <div class="cart-price">€ <span class="item-price">${calculatePrice(
                cartItem.printSize,
                cartItem.frameStyle,
                cartItem.frameWidth,
                cartItem.matWidth
              )}</span></div>
              <button class="cart-remove" id=${cartItem.id}></button>
              </div></div>`;
    return card;
  }

  function renderFrame(img, cartItem, index) {
    const container = document.getElementById("preview-container-" + index);
    render(
      img,
      container,
      cartItem.printSize,
      cartItem.frameStyle,
      cartItem.frameWidth,
      cartItem.matColor,
      cartItem.matWidth
    );
  }

  async function getGalleryItem(objectID) {
    let item = await getGalleryItemFromObjectId(objectID);
    return item;
  }

  function buildConfigurationDescription(cartItem) {
    let fixedFrameWidth = Math.round(parseFloat((cartItem.frameWidth * 0.1).toString()) * 10) / 10;
    let fixedMatWidth = Math.round(parseFloat((cartItem.matWidth * 0.1).toString()) * 10) / 10;

    console.log(fixedFrameWidth);
    console.log(fixedMatWidth);

    let print = `${getPrintSizeDesc(cartItem.printSize)} print`;
    let frame = `${fixedFrameWidth} cm ${
      cartItem.frameStyle
    } frame`;
    let mat = `${fixedMatWidth} cm ${
      cartItem.matColor
    } mat`;
    if (parseInt(cartItem.matWidth) === 0)  else {
      return `${print} in a ${frame} with a ${mat}.`;
    }
  }

  function getPrintSizeDesc(printSize) {
    let printSizeDescription = "";
    if (printSize === "M") {
      printSizeDescription = "Medium";
    } else if (printSize === "S") {
      printSizeDescription = "Small";
    }
    return printSizeDescription;
  }

  
  
  
  function getPriceTotal() {
    let priceArr = [];
    var elements = document.getElementsByClassName("item-price");
    for(var x=0; x < elements.length; x++) {
        let priceString = elements[x].innerHTML;
        let priceFloat = parseFloat(priceString);
        priceArr.push(priceFloat);
    }
    console.log(priceArr);

    let cartTotal = 0;
    for(var i=0; i < priceArr.length; i++) {
      cartTotal += priceArr[i];
    }
    document.getElementById('price-total').innerText = (Math.round(cartTotal * 100) / 100).toFixed(2);
    let totalPrice = (Math.round(cartTotal * 100) / 100).toFixed(2);
    console.log(totalPrice);
    localStorage.setItem('totalPrice', JSON.parse(totalPrice));
  }

  function checkOut() {
    const checkOutBtn = document.getElementById("checkout-button");
    checkOutBtn.addEventListener("click", );
  }
}