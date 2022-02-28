import { calculatePrice, render, getPrintSizes} from './frame.js';

window.onload = startFunc();
document.addEventListener('DOMContentLoaded', showEmptyMessage);


// --- Main --- //

class artElement {
	
}

function startFunc() {

	//setDefaultCart();

	if(checkIfShoppingCartIsEmpty()){
		return;
	}}


function showEmptyMessage(){

	if(checkIfShoppingCartIsEmpty()){

		var emptyCartDiv = document.createElement("div");
		emptyCartDiv.innerHTML = "There are no items in your shopping cart.";

		document.getElementById("cart").insertBefore(emptyCartDiv, document.getElementById("cart-total-end-of-the-page"));
		document.getElementById("checkout-button").disabled = true;
		return;
	}
}


// --- Local Storage --- //




// --- loading Items --- //
















// --- caching -- //





// --- nav bar Cart / Cart(x) --//



function checkIfShoppingCartIsEmpty(){
	if(getCartAsString() != 0 && getCartAsString() != null){

		var json = getCartItemsAsJSON();

		if(json == null)

		if(json.length > 0)
		return true;

	}
}




// --- Total Number --- //







// --- Frame Description --- //


// --- get Small, Medium or Large --- //



// --- price --- //





// --- remove --- //



// --- help functions --- //

function getCartItemsAsJSON(){

	var json = JSON.parse(getCartAsString());
	return json;
}

function getCartAsString(){
	return window.localStorage.getItem("cart");
}
