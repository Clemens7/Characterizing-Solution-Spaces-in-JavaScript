import {calculatePrice, render} from "../frame.js";
import {getStorageCart, getCartLength, getStoredObject, cacheObject} from "./cache.js";
import {retrieveObject} from "./met.js";


const section = document.getElementById("cart");

/** Html for sumtotal - taken from given cart.html*/
const cartTotal = document.createElement("div");
	cartTotal.className = "cart-total";
	cartTotal.innerHTML = "<div class=\"price\">Total: € <span id=\"price-total\">0</span></div>\n" + "<button type=\"button\" id=\"checkout-button\" disabled=\"true\">Checkout</button>";

/** Html in case cart is empty*/
const noItems = document.createElement("p");
	noItems.style = "margin: 50px 0";
	noItems.innerText = "There are no items in your shopping cart.";


loadPage();


/** loads content of page (item preview, item description, sumtotal) */
function loadPage(){
	let cacheCart = getStorageCart();
	document.querySelector('#cart-link').innerHTML = ((getCartLength() === 0) ? "Cart" );
	if (cacheCart.length !== 0)  else {
		section.append(noItems);
		section.append(cartTotal);
	}
}

/** generates code of item preview per item in cart */



/** helper to construct the text for mat / frame description
 *
 * @param printSize
 * @param frameWidth
 * @param frameStyle
 * @param matColor
 * @param matWidth
 * */


/** helper promise to load the image loaded (otherwise rendering doesn't work as it should)*
 *
 * @param src url of artwork to be loaded
 * */


/** helper to remove item (with given id) from cart
 *
 * @param id objectID of Item to be removed
 * @param occurrence the nth item of this id
 * */








