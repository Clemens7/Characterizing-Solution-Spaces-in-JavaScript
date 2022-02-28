import { calculatePrice } from './frame.js';

function checkIfLocalStorageIsEmpty(){
	
	if(window.localStorage.getItem("cart") == null)
	
	var cart = JSON.parse(window.localStorage.getItem("cart"));
	console.log(cart);
	if(cart.length == 0)
	return false;
}

document.addEventListener('DOMContentLoaded', redirectIfNessecary);

function redirectIfNessecary(){
	if( checkIfLocalStorageIsEmpty() )
}

window.onload = function(){
	
	//setLocalStorage();
	
	getSelectCountry().addEventListener("change", selectedCountryChanged);
	
	console.log("cookie was set");
	getSubTotalElement().innerHTML = calculateSubTotalPrice();
	
	setAvailableCountries();
}


function getSelectCountry(){
	return document.getElementById("country");
}



function getPayButton(){
	return document.getElementById("pay-button");
}



function getSubTotalElement(){
	return document.getElementById("price-subtotal");
}


function selectedCountryChanged(){
	
	const url = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';
	
	fetch(url)
	.then(  
		function(response) {
			if (response.status !== 200) 

	  		// Examine the text in the response  
	  		response.json().then();
    	}  
	)  
	.catch();
}





function setAvailableCountries(){
	
	let dropdown = getSelectCountry();
	dropdown.length = 0;

	const url = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';

	fetch(url)
	.then(  
		function(response) {
			if (response.status !== 200) 

	  		// Examine the text in the response  
	  		response.json().then(function(data) {  
		  		let option;
		  		
		  		for (let i = 0; i < data.destinations.length; i++) {
		  			option = document.createElement('option');
		  			option.text = data.destinations[i].displayName;
		  			option.value = data.destinations[i].country;
		  			dropdown.add(option);
    			}
    			
    			selectedCountryChanged();
    			getPayButton().disabled = false;
      		});
    	}  
	)  
	.catch();
	
	
	
	/*var select = getSelectCountry();
	var xmlhttp = getCountryData_ShippingCosts();
	
	xmlhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
	    	var text = this.responseText;
        	var json = JSON.parse(text);
        	
        	var countries = json.destinations;
	
			for(var i = 0; i < countries.length; i++){
				var opt = document.createElement('option');
				opt.value = countries[i].country;
				opt.innerHTML = countries[i].displayName;
				select.appendChild(opt);
			}
			
			onChangeSelectCountrySetsShippingCosts();
			
    	} else{
	    	getShippingCostsElement().innerHeight = "&mdash;";
	    	getPayButton().disabled = true;
    	}
	};*/
}





function calculateSubTotalPrice(){
	var cart = JSON.parse(window.localStorage.getItem('cart'));
	
	var subtotal = 0;
	
	for(var i = 0; i < cart.length; i++){
		subtotal = subtotal + calculatePrice(cart[i].printSize, cart[i].frameStyle, cart[i].frameWidth, cart[i].matWidth);
	}
	
	console.log(subtotal);
	return subtotal;
}






















