/*
    this section is only used for testing and adds some items to the shopping cart
*/


import {render} from "./frame.js";
import {calculatePrice} from "./frame.js";


let i = 0;

class item {
    
}
//let stuffInCart = [new item(500, "S", "classic", 2, "ivory", 5.5), new item(501, "M", "natural", 3, "ivory", 7.1), new item(437853, "S", "classic", 2, "ivory", 7.1), new item(459055, "S", "natural", 2, "ivory", 7.1)];
//window.localStorage.setItem("cart", JSON.stringify(stuffInCart));
/*
this is the main and final section
 */
let cart = JSON.parse(window.localStorage.getItem("cart"));
if (cart === null){
    cart = [];
}
//console.log(cart);
if(cart.length === 0){
    document.getElementsByClassName("price")[0].innerHTML="There are no items in your shopping cart.";
    document.getElementById("checkout-button").disabled = true;
}

document.getElementById("cart-link").innerText = "Cart (" + cart.length + ")";
document.getElementById("checkout-button").onclick = ;

for (let i = 0; i < cart.length; i++) 













