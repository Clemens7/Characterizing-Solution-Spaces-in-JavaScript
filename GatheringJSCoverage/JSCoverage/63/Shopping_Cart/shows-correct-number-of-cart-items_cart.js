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
    if (cart.length == 0) {
      console.log("Hello");
      document.getElementById("message").innerHTML = '<p>There are no items in your shopping cart.</p>';
    }
    document.getElementById("price-total").innerText = price;
    let cartlink = document.getElementById('cart-link');
    cart.length>0:cartlink.innerText = 'Cart';
  } 
}



export 



