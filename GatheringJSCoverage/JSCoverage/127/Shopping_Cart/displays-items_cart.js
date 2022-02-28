import * as Cart from './cartCache.js'
import {API} from "./api.js";
import * as frame from './frame.js';

let cartObjects = Cart.retrieve();
const api = new API();

showCartItems(cartObjects);
showCartItemNumber(cartObjects);

function showCartItems(cartObjects) {
  if (cartObjects.length == 0)  else {
    getItemData(cartObjects)
      .then(function (cartItemData) {
        cartObjects.forEach((cartItem, cartIndex) => createCartElement(cartItem, cartItemData, cartIndex));
      }).then(showTotalPrice)
  }
}

// Show Number of Cart Items in Header
function showCartItemNumber(cartObjects) {
  const cartHeader = document.getElementById("cart-link");
  if (cartObjects.length !== 0) {
    cartHeader.innerText = 'Cart (' + cartObjects.length + ')';
  }
}

// Get Cart Item Data from API
async function getItemData(cartObjects) {
  const cartItemData = [];
  for (var i = 0; i < cartObjects.length; i++) {
    const data = await api.getById(cartObjects[i].objectID);
    cartItemData.push(data);
  }
  console.log(cartItemData);
  return cartItemData;
}


function createCartElement(cartItem, cartItemData, cartIndex) {

  //object parameter from cartItem
  let objectID = cartItem.objectID;
  let printSize = cartItem.printSize;
  let frameStyle = cartItem.frameStyle;
  let frameWidth = cartItem.frameWidth;
  let matColor = cartItem.matColor;
  let matWidth = cartItem.matWidth;
  let itemPrize = frame.calculatePrice(printSize, frameStyle, frameWidth, matWidth);

  //url to configurator
  const url = new URL("http://localhost:3333/config.html");
  url.searchParams.set('objectID', objectID);
  url.searchParams.set('printSize', printSize);
  url.searchParams.set('frameStyle', frameStyle);
  url.searchParams.set('frameWidth', frameWidth);
  url.searchParams.set('matColor', matColor);
  url.searchParams.set('matWidth', matWidth);

  //item description
  let description = '';
  if (printSize === 'S') {description += 'Small'};
  if (printSize === 'M') {description += 'Medium'};
  if (printSize === 'L') ;
  description += ' print in a ';
  description += (frameWidth / 10);
  description += ' cm ';
  description += frameStyle;
  description += ' frame';
  if (matWidth > 0) {
    description += ' with a ';
    description += (matWidth / 10);
    description += ' cm ';
    description += matColor;
    description += ' mat';
  }
  description += '.';

  //object parameter from cartItemData
  let artist = 'Not Found';
  let title = 'Not Found';
  let date = 'Not Found';
  let image;

  for (var i = 0; i < cartObjects.length; i++){
    if (cartItemData[i].objectID == objectID){
      artist = cartItemData[i].artistDisplayName;
      title = cartItemData[i].title;
      date = cartItemData[i].objectDate;
      image = cartItemData[i].primaryImage || cartItemData[i].primaryImageSmall;
    }
  }

  const cartItemContainer = document.createElement('div');
  cartItemContainer.setAttribute("class", "cart-item");
  cartItemContainer.setAttribute("id", "cart-item-" + cartIndex);
  const cartItemPreviewContainer = document.createElement('div');
  cartItemPreviewContainer.setAttribute('class', 'cart-preview');
  cartItemPreviewContainer.setAttribute('id', 'preview-container-' + cartIndex);
  const cartItemImageContainer = document.createElement('a');
  cartItemImageContainer.setAttribute('href', url.toString());
  const cartItemImage = document.createElement('img')
  cartItemImage.setAttribute('class','cart-thumb');
  cartItemImage.setAttribute('src', image);
  cartItemImage.onload = () => {
    frame.render(cartItemImage, cartItemPreviewContainer, printSize, frameStyle, frameWidth, matColor, matWidth);
  }
  cartItemImage.setAttribute('id','preview-' + cartIndex);
  cartItemImage.setAttribute('alt','');
  const cartItemMuseumLabelContainer = document.createElement('div');
  cartItemMuseumLabelContainer.setAttribute('class','museum-label');
  const cartItemMuseumLabel = document.createElement('div');
  const cartItemMuseumLabelArtist = document.createElement('span');
  cartItemMuseumLabelArtist.setAttribute('class','artist');
  cartItemMuseumLabelArtist.innerText = artist;
  const cartItemMuseumLabelTitle = document.createElement('span');
  cartItemMuseumLabelTitle.setAttribute('class','title');
  cartItemMuseumLabelTitle.innerText = title + ', ';
  const cartItemMuseumLabelDate = document.createElement('span');
  cartItemMuseumLabelDate.setAttribute('class','date');
  cartItemMuseumLabelDate.innerText = date;
  const cartItemMuseumLabelBreak = document.createElement('br');
  const cartItemMuseumLabelFrameDescription = document.createElement('span');
  cartItemMuseumLabelFrameDescription.innerText = description;
  cartItemMuseumLabelFrameDescription.setAttribute('class','frame-description');
  const cartItemPriceContainer  = document.createElement('div');
  cartItemPriceContainer.setAttribute('class', 'cart-price');
  cartItemPriceContainer.innerText = `€`;
  const cartItemPrice = document.createElement('span');
  cartItemPrice.setAttribute('class', 'price-' + cartIndex);
  cartItemPrice.innerText = ` ${itemPrize.toFixed(2)}`;
  const cartItemRemoveButton = document.createElement('button');
  cartItemRemoveButton.setAttribute('class', 'cart-remove');
  cartItemRemoveButton.addEventListener("click", , false);

  const cartContainer = document.getElementById("cart");
  cartContainer.prepend(cartItemContainer);
  cartItemContainer.appendChild(cartItemPreviewContainer);
  cartItemPreviewContainer.appendChild(cartItemImageContainer);
  cartItemImageContainer.appendChild(cartItemImage);
  cartItemContainer.appendChild(cartItemMuseumLabelContainer);
  cartItemMuseumLabelContainer.appendChild(cartItemMuseumLabel);
  cartItemMuseumLabel.appendChild(cartItemMuseumLabelArtist);
  cartItemMuseumLabel.appendChild(cartItemMuseumLabelTitle);
  cartItemMuseumLabel.appendChild(cartItemMuseumLabelDate);
  cartItemMuseumLabel.appendChild(cartItemMuseumLabelBreak);
  cartItemMuseumLabel.appendChild(cartItemMuseumLabelFrameDescription);
  cartItemMuseumLabelContainer.appendChild(cartItemPriceContainer);
  cartItemPriceContainer.appendChild(cartItemPrice);
  cartItemMuseumLabelContainer.appendChild(cartItemRemoveButton);
}

//this passes test, but doesn't work when more than 1 item is deleted from cart


function showTotalPrice() {
  let total = 0.0;
  for (let item of cartObjects){
    total += frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
  }
  document.getElementById('price-total').innerText = `${total.toFixed(2)}`;
}

document.getElementById('checkout-button').addEventListener("click", , false);
