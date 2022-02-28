import * as DOM from "../helpers/dom.js";
import * as Storage from "../cart/storage.js";
import { getShippingAsync } from "../metmuseum/museum-api.js";
import { calculateConfigPrice } from "../../frame.js";

let destinations = [];
const costs = {
  subTotal: 0,
  shipping: 0
}

function init() {
  if (Storage.getConfigurationList().length == 0) 

  initShipping();
  refreshSubTotal();
}

function initShipping() {
  const priceShippingElement = document.getElementById("price-shipping");
  const priceTotalElement = document.getElementById("price-total");
  const payButton = document.getElementById("pay-button");
  const selectElement = document.getElementById("country");

  function buildDOM(destinations) {
    for (let destination of destinations) {
      const option = DOM.textElement("option", destination.displayName);
      option.value = destination.country;

      selectElement.appendChild(option);
    }
  }

  function disableElements() {
    priceShippingElement.innerText = "\u2014";
    priceTotalElement.innerText = "\u2014";
    payButton.disabled = true;
  }

  selectElement.onchange = () => {
    refreshShipping();
  }

  disableElements();
  getShippingAsync()
    .then(result => {
      destinations = result.destinations;

      buildDOM(destinations);
      refreshShipping();

      payButton.disabled = false;
    })
    .catch();
}

function refreshSubTotal() {
  function calcSubTotal() {
    const items = Storage.getConfigurationList();

    return items.reduce((acc, current) => acc + calculateConfigPrice(current), 0);
  }

  const priceSubTotalElement = document.getElementById("price-subtotal");
  costs.subTotal = calcSubTotal();
  priceSubTotalElement.innerText = costs.subTotal;
}

function refreshShipping() {
  const selectElement = document.getElementById("country");
  const priceShippingElement = document.getElementById("price-shipping");

  const destination = destinations.find(destination => destination.country === selectElement.value);
  if (destination) {
    costs.shipping = destination.cost / 100;
    priceShippingElement.innerText = costs.shipping.toFixed(2);

    refreshTotal();
  }
}

function refreshTotal() {
  const priceTotalElement = document.getElementById("price-total");
  priceTotalElement.innerText = costs.subTotal + costs.shipping;
}

DOM.onReady(init);