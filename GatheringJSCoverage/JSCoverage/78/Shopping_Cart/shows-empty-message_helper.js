import * as Frame from './frame.js';

export function cartItemsSize() {
  var cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById("cart-link").innerText = (cart.length > 0  : "Cart");
}

export function getCartItems() {  
  return JSON.parse(localStorage.getItem('cart')) || [];
}

export 

export 

export async function getDivsForCartView() {
  var cartTag = document.getElementById("cart");
  var items = getCartItems();
  var total = 0;
  var item;
  
  for(let i=0; i < items.length; i++) 
  
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

export 