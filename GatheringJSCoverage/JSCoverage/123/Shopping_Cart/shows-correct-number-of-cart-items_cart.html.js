
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
if(temp) {
  var cartItems = JSON.parse(temp).length;
  document.getElementById("cart-link").innerHTML = "Cart" + " (" + cartItems + ")";
}


//shows empty message if no item is in the cart
if(localStorage.getItem("cart") === null)  else {
  drawPreviews();
  document.getElementById("checkout-button").onclick = ;
  
}

//draw Artwork previews
// - preview in its configurates frame
// - usual artwork information (title, artist, date) + textual description
// - price
async function drawPreviews() {
    let totalSum = 0;

    for(var i = 0; i < arrayOfObjects.length; i++) 

      Array.from(document.querySelectorAll(".cart-remove")).forEach();

    totalSum = parseFloat(totalSum).toFixed(2);
    document.getElementById("price-total").innerHTML = totalSum;
}

//show the total sum

