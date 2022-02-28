import * as Storage from './helper/storage.js';
import * as ArtmartApi from './helper/artmart-shipping-api.js';
import * as FrameConfigurator from '../frame.js';


var carts = Storage.getCart();
console.log(carts);
if (carts == null || carts.length <= 0) 

(async function() {
  const destinations = await ArtmartApi.retrieveShippingDestinations();
  if (destinations === undefined)  else {
    document.getElementById('pay-button').disabled = false;
    const countries = ArtmartApi.retrieveCountryDisplayNames(destinations);
    loadCountryElements(destinations);
    const subtotalPrice = displaySubtotal(carts);
    const selectedCountry = retrieveSelectedCountry();
    const shippingCost = await displayShippingCosts(selectedCountry);
    displayTotalPrice(subtotalPrice, shippingCost);
  }
})();

displaySubtotal(carts);

const countryElement = document.getElementById('country');
countryElement.addEventListener("change", );

function displayTotalPrice(subtotalPrice, shippingCost) {
  const totalPriceElement = document.getElementById('price-total');
  const totalPrice = subtotalPrice + (shippingCost / 100);
  totalPriceElement.value = totalPrice;
  totalPriceElement.innerHTML = totalPrice.toFixed(2);
}

function displaySubtotal(carts) {
  const subtotalElement = document.getElementById('price-subtotal');
  const subtotalPrice = calculateSubtotal(carts);
  subtotalElement.value = subtotalPrice;
  subtotalElement.innerHTML = subtotalPrice.toFixed(2);
  return subtotalPrice;
}

async function displayShippingCosts(selectedCountry) {
  const shippingCostElement = document.getElementById('price-shipping');
  const shippingCost = await retrieveShippingCost(selectedCountry);
  shippingCostElement.value = shippingCost;
  shippingCostElement.innerHTML = (shippingCost / 100).toFixed(2);
  return shippingCost;
}


async function loadCountryElements(destinations) {
  const countryContainer = new CountryContainer();
  countryContainer.clear();
  countryContainer.addElements(destinations);
}

function retrieveSelectedCountry() {
  const countryE = document.getElementById('country');
  return countryE.options[countryE.selectedIndex].value;
}


async function retrieveShippingCost(selectedCountry) {
  const destinations = await ArtmartApi.retrieveShippingDestinations();
  let shippingCost;
  for (let destination of destinations) {
    if (destination.country === selectedCountry) {
      shippingCost = destination.cost;
      break;
    }
  }
  return shippingCost;
}



function calculateSubtotal(carts) {
  const cartPrices = retrieveCartPrizes(carts);
  let subtotalPrice = 0;
  for (let price of cartPrices) {
    subtotalPrice += price;
  }
  return subtotalPrice;
}


function retrieveCartPrizes(cart) {
  let cartPrices = [];
  for (let cart of carts) {
    let price = FrameConfigurator.calculatePrice(
      cart.printSize, cart.frameStyle, cart.frameWidth, cart.matWidth);
    cartPrices.push(price);
  }
  return cartPrices;
}

class CountryContainer {
  constructor() {
    this.select = document.getElementById('country');
  }

  clear() {
    this.select.innerHTML = '';
  }

  addElements(elements) {
    for (let element of elements) {
      let option = document.createElement('option');
      option.value = element.country;
      option.innerHTML = element.displayName;
      this.select.appendChild(option);
    }
  }
}