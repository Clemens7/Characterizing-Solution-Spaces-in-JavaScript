import * as frame from './frame.js';

var MET_API_OBJECTS_ENDPOINT = "https://collectionapi.metmuseum.org/public/collection/v1/objects"

document.addEventListener("DOMContentLoaded", init());


export function init() {
	//localStorage.clear();
	//addItemToStorage(new Item(39799, 'M','classic',56,'red', 45));
	//addItemToStorage(new Item(38799,'L','classic',56,'red', 45));
	//localStorage.setItem("cart",JSON.stringify([{objectID: 39799,printSize: 'L', frameWidth: 27, frameStyle: 'classic',  matWidth: 31, matColor: 'indigo'},{objectID: 39799, printSize: 'S', frameWidth: 20, frameStyle: 'shabby',  matWidth: 0 }]))
	//checkCart();
	frame.updateItemAmount();
	printTotal()
	disableCheckout();
	cart_show_items();
}

export function printTotal(){
	const cart = frame.getListFromStorage();
	let price = 0;
	
	for(let i=cart.length-1 ; i>=0; i--)
	
	const total = document.getElementById("price-total");
	total.innerHTML = price;
	
}

export 

export 

export 
window.render = render;

export 

export function cart_show_items() {

	const cart = frame.getListFromStorage();

	for(let i=cart.length-1 ; i>=0; i--)
}


export 
window.closeItem = closeItem;

export function disableCheckout(){
	if(frame.getListFromStorage().length==0){
		document.getElementById("checkout-button").setAttribute("disabled","");
		const newElement = document.createElement("div");
		newElement.innerHTML = "There are no items in your shopping cart.";
		document.getElementById("checkout-button").parentElement.insertBefore(newElement, document.getElementById("checkout-button").parentElement.firstChild);
	}
}
