var subtotal = 0;
var shippingCost = 0;
var totalCost = 0;
var destinations;
var cart;

try {
 cart = checkforCart();
 displaySubtotal(cart);
}


fetch("https://web-engineering.big.tuwien.ac.at/s20/a2/shipping").then((Response) => {
    return Response.json();
})
.then((data) => {
    displayCountryList(data);    
})
.catch();    



import {calculatePrice} from "./frame.js";
function displaySubtotal(data){
    for(let item of data) {
        subtotal += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    }    
    document.getElementById("price-subtotal").innerHTML = subtotal.toFixed(2);
}

function displayCountryList(listOfCountries) {
    destinations = listOfCountries.destinations;    
    console.log(destinations);
    const countrySelect = document.getElementById("country");
    for(let i = 0; i < destinations.length; i++){
        countrySelect.innerHTML += `<option value="${destinations[i].country}">${destinations[i].displayName}</option>`;       
    }
    changeShippingCost();
    document.getElementById("country").addEventListener('change', () => changeShippingCost());
}

function changeShippingCost() {
    for(let i = 0; i < destinations.length; i++){
        if(document.getElementById("country").value === destinations[i].country){
            shippingCost = destinations[i].cost / 100;
        }
    } 
    totalCost = subtotal + shippingCost;
    document.getElementById("price-shipping").innerHTML = shippingCost.toFixed(2);
    document.getElementById("price-total").innerHTML = totalCost.toFixed(2);
}

function checkforCart(){
    if(localStorage.getItem("cart") === null)
    else{
        let currCart = JSON.parse(localStorage.getItem("cart"));
        if(currCart.length <= 0)
        return currCart;
    }    
}