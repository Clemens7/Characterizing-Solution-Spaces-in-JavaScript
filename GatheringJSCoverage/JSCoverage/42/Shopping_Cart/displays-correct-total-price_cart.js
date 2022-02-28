import * as frame from './frame.js'
import * as dom from './cart-dom.js'
var cartItems;

document.addEventListener('DOMContentLoaded', event => {
        if(retrieveFromLocal("cart")){
            addCart(retrieveFromLocal("cart").length)
        }

    // if(retrieveFromLocal){
    //     cartItems=retrieveFromLocal();
    //     show_cart_Items()
    // }else{
    //     //Show No Itmes
    // }
}
)











function retrieveFromLocal(){
    const key = "cart"
    if(key in localStorage){
        return JSON.parse(localStorage[key]);
    }
}

/*function addCart(num){
    document.getElementById("cart-link").innerHTML="Cart ("+num+")";*/

function addCart(num){
    document.getElementById("cart-link").innerHTML="Cart ("+num+")";

}



