import { calculatePrice } from './frame.js';
import * as CacheService from './CacheService.js';
import { ArtmartService } from "./ArtmartService.js";

let countries = null;

let subtotal = 0;

(async () => {
  checkCart();
  subtotal = showSubtotal();
  document.getElementById("country").addEventListener("change", calcTotal);
  try {
    const artmartService = new ArtmartService;
    const { destinations } = await artmartService.countries();
    countries = destinations;
    fillCountries(destinations);
    enableElements();
  }
  

})();

function checkCart() {
  let cartItems = CacheService.get("cart");
  if (cartItems === null || cartItems.length === 0) 
}

function fillCountries(destinations) {
  let countrySelector = document.getElementById("country");
  for (let i = 0; i < destinations.length; i++) {
    let currOption = document.createElement("option");
    currOption.innerHTML = destinations[i].displayName;
    currOption.setAttribute("value", destinations[i].country);
    countrySelector.appendChild(currOption);
  }
}

function enableElements() {
  document.getElementById("pay-button").removeAttribute("disabled");
  calcTotal();
}

function calcTotal() {
  let shipping = calcShipping();
  document.getElementById("price-total").innerHTML = (subtotal + shipping).toFixed(2);
}

function calcShipping() {
  let countrySelector = document.getElementById("country");
  let shippingCost = parseInt(countries[countrySelector.selectedIndex].cost) / 100;
  document.getElementById("price-shipping").innerHTML = shippingCost.toFixed(2);
  return shippingCost;
}

function showSubtotal() {
  let cartItems = CacheService.get("cart");
  let subtotal = 0;
  for (let i = 0; i < cartItems.length; i++) {
    subtotal += calculatePrice(cartItems[i].printSize, cartItems[i].frameStyle, parseInt(cartItems[i].frameWidth), parseInt(cartItems[i].matWidth));
  }
  document.getElementById("price-subtotal").innerHTML = subtotal.toFixed(2);
  return subtotal;
}