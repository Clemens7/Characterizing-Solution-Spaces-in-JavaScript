import * as frame from './frame.js'
import * as dom from './cart-dom.js'
var cartItems;

document.addEventListener('DOMContentLoaded', event => {
        if(retrieveFromLocal("cart"))else{
            addCart(0)
            document.getElementById('msg').innerHTML="There are no items in your shopping cart."
            document.getElementById('checkout-button').disabled=true
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
    if(key in localStorage)
}

/*function addCart(num){
    document.getElementById("cart-link").innerHTML="Cart ("+num+")";*/

function addCart(num){
    document.getElementById("cart-link").innerHTML="Cart ("+num+")";

}



