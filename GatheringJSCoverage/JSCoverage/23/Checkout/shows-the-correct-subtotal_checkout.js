import { getFromLocalStorage } from "./print-objects-cache.js";

let cartItems = getFromLocalStorage();

if(cartItems === null || cartItems.length === 0) 

let subTotalPrice = (localStorage.getItem("totalPrice"));
document.getElementById("price-subtotal").innerHTML = parseFloat(subTotalPrice).toFixed(2);

//getShippingInfo();
let infoError = false;
let shippingCost;
var payButton = document.getElementById("pay-button");

var request = new XMLHttpRequest();
request.open('GET', 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    let data = JSON.parse(request.responseText);
    for (var i = 0; i < data.destinations.length; i++) {
        console.log(data.destinations[i]);
        document.getElementById("country").innerHTML += 
        `<option value="${data.destinations[i].country}">${data.destinations[i].displayName}`;
    }
    let selected = document.getElementById("country");
    selected.addEventListener("change", )    
  }
};

request.onerror = ;

request.send();



