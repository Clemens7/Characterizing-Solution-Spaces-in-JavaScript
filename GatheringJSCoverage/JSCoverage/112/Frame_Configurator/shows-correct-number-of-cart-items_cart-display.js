import {getAllProducts, add, CObject, remove} from './cart.js';
import {getObject} from "./api.js";
import {calculatePrice, render} from "./frame.js";



export 





export function cartElements(){
    let cartn = document.getElementById("cart-link");
   if(getAllProducts().length !== 0)else{
   cartn.innerHTML = "Cart";
   }
}


