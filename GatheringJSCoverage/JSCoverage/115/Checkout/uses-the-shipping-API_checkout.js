import {calculatePrice} from './frame.js';

const API =  'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';
const payButton = document.getElementById('pay-button');
const select = document.getElementById('country');

async function getDestinations(){
  try {
    const res = await fetch(API);
    const data = await res.json();
    const destinations = await data.destinations;
    payButton.disabled = false;
    return destinations;
  }}

select.addEventListener('change', );

payButton.disabled = true;

let items = localStorage.getItem('cart');
if (!items) 
items = JSON.parse(items);

let subtotal = 0.00;
items.forEach(function (item) {
    subtotal += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
});
document.getElementById('price-subtotal').innerText = `${subtotal}`;

let destinations = [];
getDestinations().then(fetchedDestinations => {
  destinations = fetchedDestinations;
  for(let destination of destinations) {
    let option = document.createElement('option');
    option.value = `${destination.country}`;
    option.text = `${destination.displayName}`;
    select.add(option);
  }
});
