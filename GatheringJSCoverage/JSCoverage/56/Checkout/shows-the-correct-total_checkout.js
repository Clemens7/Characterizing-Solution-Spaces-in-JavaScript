import { calculatePrice } from "./frame.js"

const ARTMART_API_BASE = "https://web-engineering.big.tuwien.ac.at/s20/a2"

export function payButtonEnabled(enabled) {
  document.getElementById("pay-button").disabled = !enabled;
}

export async function initCosts() {
  updatePrice("price-subtotal", subtotal());
  try {
    const destinations = await fetchShippingData();
    addCountryOptions(destinations);
    // used when country is changed
    sessionStorage.setItem("shippingCosts", JSON.stringify(destinations));
    payButtonEnabled(true);
  } 
  updateCosts();
}

function updatePrice(id, num) {
  document.getElementById(id).innerHTML = numberOrPlaceholder(num);
}

export function updateCosts() {
  updatePrice("price-subtotal", subtotal());
  updatePrice("price-shipping", shippingCosts());
  updatePrice("price-total", total());
}

async function fetchShippingData() {
    const response = await fetch(`${ARTMART_API_BASE}/shipping`);
    const json = await response.json();
    return json.destinations;
}

function addCountryOptions(countries) {
  for (let elem of countries) {
    let option = document.createElement("option");
    option.value = elem.country;
    option.innerHTML = elem.displayName;
    document.getElementById("country").appendChild(option);
  }
}

function subtotal() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (typeof cart !== "undefined") {
    const sumCosts = (acc,cur) => acc + calculatePrice(cur.printSize, cur.frameStyle, cur.frameWidth, cur.matWidth);
    return cart.reduce(sumCosts, 0);
  }}

function shippingCosts() {
  const costs = JSON.parse(sessionStorage.getItem("shippingCosts"));
  if (typeof costs !== "undefined") {
    for (let elem of costs) {
      if (elem.country === document.getElementById("country").value) {
        return elem.cost / 100;
      }
    }}

const total = () => maybeAdd(subtotal(), shippingCosts())

function numberOrPlaceholder(num) {
  return typeof num === "number"
    ? num.toFixed(2)
    ;
}



function maybeAdd(num1,num2) {
  if (typeof num1 !== "undefined" && typeof num2 !== "undefined") {
    return num1 + num2;
  }
}
