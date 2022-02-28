import * as Frame from "./frame.js"

const shippingAPI = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';
var subTotalPrice;

goCheckout();

function goCheckout(){
    if(JSON.parse(window.localStorage.getItem('cart')) == null)
    let cache = window.localStorage.getItem('checkoutCache');
    let countryList;
    subTotalPrice = calculateSubTotal();
    document.getElementById('price-subtotal').innerHTML = subTotalPrice;
    try{
      window.onload = fetchAPI(countryList,cache);
    }
    
    document.getElementById('pay-button').disabled =  false;

}

async function fetchAPI(countryList,cache){
    if(cache == null)
    else{
      countryList = JSON.parse(cache);
      await setCountry(countryList);
      document.getElementById('country').addEventListener('change',getShippingCost,false);
    }

}

function setCountry(countryList){
    for(let i = 0;i<countryList.destinations.length;i++){
      let opt = document.createElement('option');
      opt.appendChild(document.createTextNode(countryList.destinations[i].displayName));
      opt.value = countryList.destinations[i].country;
      document.getElementById('country').appendChild(opt);
    }
    let shippingCost = (countryList.destinations[document.getElementById('country').selectedIndex].cost / 100).toFixed(2);
    document.getElementById('price-shipping').innerHTML = shippingCost;
    document.getElementById('price-total').innerHTML = subTotalPrice + parseInt(shippingCost);

}

function calculateSubTotal(){
  let count = 0;
  let cart = JSON.parse(window.localStorage.getItem('cart'));
  for(let i in cart){
    count += Frame.calculatePrice(cart[i].printSize, cart[i].frameStyle, cart[i].frameWidth, cart[i].matWidth);
  }
  return count;
}



function getShippingCost(e){
    let countryList = JSON.parse(window.localStorage.getItem('checkoutCache'));
    let index = getSelected(e.target.value,countryList);
    let shippingCost = (countryList.destinations[index].cost / 100);
    let shipping = (countryList.destinations[index].cost / 100).toFixed(2);
    document.getElementById('price-shipping').innerHTML = shipping;
    document.getElementById('price-total').innerHTML = subTotalPrice + shippingCost;

}

function getSelected(country,countryList){
  for(let i = 0;i < countryList.destinations.length;i++){
    if(country === countryList.destinations[i].country){
      return i;
    }
  }}
