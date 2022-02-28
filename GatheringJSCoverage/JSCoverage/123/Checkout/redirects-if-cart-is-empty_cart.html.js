
import * as frame from "./frame.js";

// local storage
//TODO: get data from search/frame Configurator                                            <- // TODO !

// this data should be generated dynamically from the user!
/*
let arrayOfObjects = [{
  "objectID":"1",
  "printSize":"5",
  "frameStyle":"wood",
  "frameWidth":"500",
  "matColor":"red",
  "matWidth":"200"
  },
  {
  "objectID":"2",
  "printSize":"5",
  "frameStyle":"wood",
  "frameWidth":"500",
  "matColor":"red",
  "matWidth":"200"
}];

localStorage.setItem("cart", JSON.stringify(arrayOfObjects));
*/
let totalArtworks = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

//retrieving
let retrievedData = localStorage.getItem("cart");
let arrayOfObjects = JSON.parse(retrievedData);

//shows correct number of items in the cart
var temp = window.localStorage.getItem("cart");
if(temp) 


//shows empty message if no item is in the cart
if(localStorage.getItem("cart") === null) {
  let myCart = document.getElementById("cart");
  let htmlEmpty =
  `<div class="cart-item">
    <span class="cart-empty">There are no items in your shopping cart.</span>
  </div>
  <div class="cart-total">
    <div class="price">Total: € <span id="price-total">0</span></div>
    <button type="button" id="checkout-button">Checkout</button>
  </div>`;
  myCart.parentNode.insertAdjacentHTML("afterbegin",htmlEmpty);
  myCart.parentNode.removeChild(myCart);
  document.getElementById("checkout-button").setAttribute("disabled", true);

}

//draw Artwork previews
// - preview in its configurates frame
// - usual artwork information (title, artist, date) + textual description
// - price


//show the total sum

