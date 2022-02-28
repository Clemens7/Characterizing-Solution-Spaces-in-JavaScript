
import * as FrameJS from './frame.js'

//accesses the API
async function findCountries () {
fetch(('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping'))
.then(res => res.json())
.then(data => updateCountries(data));
}

findCountries();
updatePrice();

//map used to associate each country with its cost
var helpMap = new Map();

//adds countries to html
function updateCountries(data) {
  let countryList = document.getElementById('country');
  for (let i = 0; i < data.destinations.length; i++) {
    let content = document.createElement('option');
    content.appendChild(document.createTextNode(data.destinations[i].displayName));
    content.value = data.destinations[i].country;
    let shippingCosts2Dec = (data.destinations[i].cost/100).toFixed(2);
    helpMap.set(data.destinations[i].country, shippingCosts2Dec);
    countryList.appendChild(content);
  }
  loaded();
}

//gets called when all countries are added to the html 
function loaded() {

  let x = document.getElementById('country');
  x.addEventListener('change', updateShippingCosts);

  function updateShippingCosts(event) {
    let costs = helpMap.get(event.target.value);
    document.getElementById('price-shipping').innerHTML = costs;
    document.getElementById('pay-button').disabled = true;
    updatePrice();
  }
}

//calculates and updates subtotal and total
function updatePrice() {
  let cart = JSON.parse(localStorage.getItem('cart'));
  let subTot = 0;

  for (let c of cart) {
      subTot += FrameJS.calculatePrice(c.printSize, c.frameStyle, c.frameWidth, c.matWidth)
  }

  let total = Number(document.getElementById('price-shipping').innerHTML);
  total += subTot;

  if (isNaN(total)) {
    total = '&mdash;';
  }
  if (isNaN(document.getElementById('price-shipping').innerHTML)) {
    document.getElementById('price-shipping').innerHTML = '&mdash;';
  }

  document.getElementById('price-subtotal').innerHTML = subTot;
  document.getElementById('price-total').innerHTML = total;

  if (!isNaN(total) && !isNaN(document.getElementById('price-shipping').innerHTML) && !isNaN(subTot)) {
    document.getElementById('pay-button').disabled = false;
    }
}
