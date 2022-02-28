import {getAll} from "./cart.js"
import { calculatePrice } from "./frame.js"
let destinatons
let destination
let subTotal

window.addEventListener('load', async () => {
	subTotal = getAll().reduce((acc, item) => acc + calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth), 0)
	document.querySelector("#price-subtotal").textContent = subTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })	
	await loadShipping()
	
	onCountryChange()
	
	document.querySelector("#country").addEventListener('change', onCountryChange)
	if (getAll().length == 0)
})

function onCountryChange () {
	 destination = destinatons.find(destination => destination.country == document.querySelector("#country").value)
		
	document.querySelector("#price-shipping").textContent = (destination.cost /100).toLocaleString(undefined, { minimumFractionDigits: 2 })
	updateTotal()
}

function updateTotal (){
	console.log(subTotal)
	document.querySelector("#price-total").textContent = (destination.cost /100 + subTotal).toLocaleString(undefined, { minimumFractionDigits: 2 })
}


async function loadShipping(objectId) {
    const response = await fetch('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping')
    if(response.status != 200) 

    const select = document.querySelector("#country")
	
    const responseBody = await response.json()
	destinatons = responseBody.destinations
	
	for(let destination of responseBody.destinations){
		select.appendChild(new Option(destination.displayName, destination.country))
	}
	
}