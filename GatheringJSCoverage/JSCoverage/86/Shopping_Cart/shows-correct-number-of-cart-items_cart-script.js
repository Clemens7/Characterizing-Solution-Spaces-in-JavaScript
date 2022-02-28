import * as Frame from './frame.js';
import {cartCache} from "./search-cache.js"; //Shows the amount of the Cart

document.addEventListener('DOMContentLoaded', async () => {
  try {
      await createCart(JSON.parse(localStorage['cart']));
  }
  
  await cartCache();

  //Event for removing an Cart-Object via the X-Button
   let removeButton = document.getElementsByClassName("cart-remove");
   for(let buttons = 0; buttons < removeButton.length; buttons++) })

//Fetch Data from the API via the objectID
import {retrieveData} from "./search-api.js";


//Creates the cart.html file with the recieved Cart-Items
async function createCart(data){
    const div = document.getElementById('cart');
    if (data.length < 1) {
        div.appendChild(emptyCartHTML());
        div.appendChild(createTotalPrice());
        document.getElementById("checkout-button").disabled = true;
    }
}

//Creates the Cart-Items for createCart


//Builds a link with the frame-configuration to link to the corresponding frame-configuration page.


//Builds a frame-description String for the HTML


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


//Calculates the total price
function calcTotalPrice(data){
    let sum = 0;
    if (data !== undefined) 
    else {
        return 0;
    }
}

//Returns the HTML-Message for an empty Cart
function emptyCartHTML(){
    const div = document.createElement("div");
    div.className = "empty-cart";
    div.innerHTML =
        `<p><b>There are no items in your shopping cart.</b></p><br>`;
    return div;
}