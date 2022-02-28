import { calculatePrice } from './frame.js';
import { writeNumberOfCartItems } from './global.js';

writeNumberOfCartItems(document.getElementById('cart-link'));

let data = window.localStorage["cart"];
if (data == undefined)  else {
	let cart = JSON.parse(data);
	if (cart == undefined || cart.length == 0) {
		noItemInCart();
	}
}

const checkoutBtn = document.getElementById("checkout-button");
checkoutBtn.addEventListener("click", )

function noItemInCart() {
	document.getElementById("info").innerHTML = "There are no items in your shopping cart.";
	document.getElementById("checkout-button").disabled = true;
}









