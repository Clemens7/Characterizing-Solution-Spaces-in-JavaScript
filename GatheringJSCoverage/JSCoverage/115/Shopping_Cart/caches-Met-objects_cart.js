import { loadObject, metAPI } from './metApi.js';
import { render, calculatePrice } from './frame.js';

const cart = document.getElementById('cart');

let items = localStorage.getItem('cart');

if (!items)  else {
	items = JSON.parse(items);
	document.getElementById('cart-link').textContent = `Cart (${items.length})`;

  Promise.all(items.map(item => loadObject(item.objectID, metAPI))).then( objects => {
    
    for(let i = 0; i < items.length; i++) {
      cart.innerHTML = `
        <div class="cart-item">
          <div class="cart-preview" id="preview-container-${i}">
            <a href="config.html?objectID=${items[i].objectID}&printSize=${items[i].printSize}&frameStyle=${items[i].frameStyle}&frameWidth=${items[i].frameWidth}&matColor=${items[i].matColor}&matWidth=${items[i].matWidth}">
              <img class="cart-thumb" src="${objects[i].primaryImageSmall}" id="preview-${i}" alt="${objects[i].objectName}">
            </a>
          </div>
          <div class="museum-label">
            <div>
              <span class="artist">${objects[i].artistDisplayName}</span>
              <span class="title">${objects[i].title}</span>,
              <span class="date">${objects[i].objectDate}</span>
              <br><br>
              <span class="frame-description">${sizeToText(items[i].printSize)} print in a ${(items[i].frameWidth / 10.0)} cm ${items[i].frameStyle} frame${matText(items[i])}.</span>
            </div>
            <div class="cart-price"> ${calculatePrice(items[i].printSize, items[i].frameStyle, items[i].frameWidth, items[i].matWidth)}€ <span id="price-${i}"></span></div>
            <button class="cart-remove"></button>
          </div>
        </div>` + cart.innerHTML;
    }

    const cartRemoveButtons = document.querySelectorAll('.cart-remove');

    for(let j = 0; j < items.length; j++) {
      const img = document.getElementById(`preview-${j}`);
      const container = document.getElementById(`preview-container-${j}`);
      img.addEventListener('load', () => {
        render(img, container, items[j].printSize, items[j].frameStyle, items[j].frameWidth, items[j].matColor, items[j].matWidth);
      });
      cartRemoveButtons[j].addEventListener ('click', );
    }
    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener('click', );
  });
  
  let priceTotal = 0.00;
    items.forEach(function (item) {
      priceTotal += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
  });
  document.getElementById('price-total').textContent = `${priceTotal}`;

  function sizeToText(printSize) {
    if (printSize == 'S')
    return 'Small';
    if (printSize == 'M')
    return 'Medium';}

  function matText(item) {
    if (item.matWidth > 0) 
    return ` with a ${(item.matWidth / 10.0)} cm ${item.matColor} mat`;}
}