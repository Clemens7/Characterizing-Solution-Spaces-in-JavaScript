import * as Frame from './frame.js';

export 

export function getCartItems() {  
  return JSON.parse(localStorage.getItem('cart')) ;
}

export function isEmpty() {
  return getCartItems().length < 1;
}

export 

export 

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