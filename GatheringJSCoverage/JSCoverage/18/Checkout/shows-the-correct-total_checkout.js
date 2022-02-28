import {calculatePrice} from './frame.js';

let responseData;

/**
 * Populate the country selection dropdown using a list of countries
 * @param {Array.<string>} countries
 */
function populateCountriesDropdown(countries) {
  const countryDropdown = document.querySelector('select#country');
  countries.forEach(country => {
    const countryOption = document.createElement('option');
    countryOption.innerText = country.displayName;
    countryOption.setAttribute('value', country.country);
    countryDropdown.appendChild(countryOption);
  })
  document.createElement('option')
}

/**
 * Formats a price as euros and cents
 * @param {number} price - The price in cents
 */
function formatPrice(price) {
  let euro = price;
  euro = euro.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  return euro;
}

/**
 * Calculate shipping cost and update in DOM.
 * @param {string} country - The country for which to calculate shipping cost
 */
function updateShippingCost(country) {
  const shippingCostDisplay = document.querySelector('#price-shipping');
  let price;
  if (responseData) {
    const countryObject = responseData.find(object => object.country === country);
    if (countryObject) {
      price = countryObject.cost;
    }
  }
  if (price) {
    shippingCostDisplay.innerText = formatPrice(price/100);
    const shippingPrice = price/100;
    calc(shippingPrice);
  }
}

const countryDropdown = document.querySelector('select#country');
countryDropdown.addEventListener('change', (event) => {
  console.log(event.target.value);
  updateShippingCost(event.target.value);
});

/**
 * Calculates the sum of items in the cart with its pric/size
 * @param {Array.<integer>} items 
 */
function subTotalCost(items){
  var sub = 0;
  for(let i = 0; i < items.length;i++){
    sub += calculatePrice(items[i].printSize, items[i].frameStyle, items[i].frameWidth, items[i].matWidth);
  }
updateSubCost(sub);
console.log({sub});
return sub;
}

/**
 * Update subCosts in DOM.
 * @param {integer} subCost - get's the sub costs from subTotalCost
 */
function updateSubCost(subCost){
  var subCostDisplay = document.querySelector('#price-subtotal');
  if(subCost){
    subCostDisplay.innerHTML = formatPrice(subCost);
  }
}

/**
 * Calculates the total price
 * @param {integer} shippingPrice - get's the shipping costs from updateShippingCost 
 */
function calc(shippingPrice){
  var storedCarts = JSON.parse(localStorage.getItem('cart'));
  const result = subTotalCost(storedCarts)+shippingPrice;
  console.log(subTotalCost(storedCarts));
  console.log({shippingPrice});
  console.log({result});
  updateTotalCost(result);
}

/**
 * Update totalCosts in DOM.
 */
function updateTotalCost(total){
  var totalCostDisplay = document.querySelector('#price-total');
  if (total) {
    totalCostDisplay.innerHTML = formatPrice(total);
    document.getElementById("pay-button").disabled = false;
  }
}

async function getDestinationData_retrieve(){
    const url = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';
    document.getElementById("pay-button").disabled = true; // paybutton disabled until totalcosts are calculated
    try {
        var storedCarts = JSON.parse(localStorage.getItem('cart'));
        console.log({storedCarts});

        //If there are no items in the shopping cart, 
        //  the user should be redirected to the empty shopping cart page.
        if(localStorage.getItem('cart') === null) else{
          console.log("cart not empty");
        }
        console.log({storedCarts});
        subTotalCost(storedCarts);

        const response = await fetch(url);
        const rawData = await response.json();
        responseData = await rawData.destinations;
        console.log(responseData);

        populateCountriesDropdown(responseData);

      }
    
}

getDestinationData_retrieve();
