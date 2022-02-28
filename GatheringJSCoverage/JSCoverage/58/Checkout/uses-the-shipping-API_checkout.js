import * as Cart from './cart-api.js';
import * as Frame from './frame.js';

let subtotal = document.getElementById("price-subtotal");
let shipping = document.getElementById("price-shipping");
let total = document.getElementById("price-total");
let select = document.getElementById('country');
let pay = document.getElementById("pay-button");
select.addEventListener("change", );

//var destinations;
var countries = new Map();

async function get_info(){

	shipping.innerHTML 	= " —";
	total.innerHTML 	= " —";
	subtotal.innerHTML 	= " —";
	pay.disabled = true;

	fetch("https://web-engineering.big.tuwien.ac.at/s20/a2/shipping")
	.then(response => response.json())
	.then(shipping_info => {
		var destinations = shipping_info.destinations;
		for (let dest of destinations){
			var option = document.createElement('option');
			option.appendChild( document.createTextNode(dest.displayName) );
			option.value = dest.country; 
			select.appendChild(option); 
			countries.set(dest.country, dest.cost);
		}	
		pay.disabled = false;
		calculate();
	})
	.catch();
}


function calculate(){
	var shipping_cost = Number(countries.get(select.value));
	shipping_cost = (shipping_cost/100);
	shipping.innerHTML = shipping_cost.toFixed(2);

	var subtotal_cost = 0; 
	for (let item of Cart.getCartItems()){
		console.log(item);
		var cost = Frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
		console.log(cost);
		subtotal_cost += cost;
	}
	console.log(typeof(shipping_cost));
	subtotal.innerHTML = subtotal_cost.toFixed(2);
	total.innerHTML = (Number(shipping_cost) + subtotal_cost).toFixed(2);
}

document.addEventListener('DOMContentLoaded', event => {
	if (Cart.getCartItems().length == 0)
	get_info();
});
