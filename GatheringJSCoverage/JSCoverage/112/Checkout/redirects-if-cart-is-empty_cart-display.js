import {getAllProducts, add, CObject, remove} from './cart.js';
import {getObject} from "./api.js";
import {calculatePrice, render} from "./frame.js";



export async function init(){
let cartItem = document.getElementById("template").content;
let cart1 = document.getElementById("cart");





if (getAllProducts().length === 0) {
let text = document.createTextNode("There are no items in your shopping cart.");
cart1.insertBefore(text, cart1.firstChild);
document.getElementById("checkout-button").disabled = true;

}


}





export 


