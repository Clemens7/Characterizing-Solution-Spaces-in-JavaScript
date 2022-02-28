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
    if (cart.length == 0) ;
  }catch (error) {
    console.log(
      `An error happened when trying to retrieving data from URL ${API_URL}`
    );
    console.log(error);
  }
}



export 



