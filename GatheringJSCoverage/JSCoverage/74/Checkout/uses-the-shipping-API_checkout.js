import {calculatePrice} from './frame.js';
/**
 * ************************* Global Variables *********************************
 */
const REQUEST_URL = 'https://web-engineering.big.tuwien.ac.at/s20/a2';
const EMDASH = '—';

var DESTINATIONS = new Array();
var CART = new Array();
var SUBTOTAL = 0; // subtotal of all cart items without shipping
var SHIPPING_COSTS = 0;

/**
 * ************************* Main Entry Points *********************************
 */

 /**
  * Sets the cart. Redirects to cart page if the shopping cart is empty.
  */
window.addEventListener('DOMContentLoaded', (event) => {
    CART = localStorage.getItem ('cart');

    if (CART === null)
         

    CART = Object.values(JSON.parse(CART));
});

 /**
   * After the window is loaded, a GET Request for all available destinations is sent.
   * On success, the parsed response is stored in the global destinations array.
   */
window.onload = function (){
    addEventListeners ();
    disablePayButton(true);
    setSubtotal();

    this.fetch(REQUEST_URL + '/shipping')
        .then (function(response){
            return response.json();
        })
        .then (function (data){
            DESTINATIONS = Object.values (data)[0];
        })
        .then (function (){
            setShippingDestinations ();
        })
        .then (function(){
            setTotal();
        })
        .then (function (){
            disablePayButton(false);
        })
        .catch();    
}

/**
 * ************************* Functions *********************************
 */

 /**
  * Sets the total endprice in the html element.
  */
 function setTotal(){
    var total = (parseFloat(SUBTOTAL) + parseFloat(formatCosts(SHIPPING_COSTS))).toFixed(2);

    let totalElement = document.getElementById("price-total");      
    totalElement.innerHTML = total;
 }

 /**
  * Sets the calculated subtotal in the html element. 
  */
 function setSubtotal(){
    SUBTOTAL = calculateSubtotal ();
    let subtotalElement = document.getElementById("price-subtotal");

    subtotalElement.innerHTML = SUBTOTAL;
 }

 /**
  * Calculates the subtotal of all items in the shopping cart.
  * 
  * @returns The subtotal of all items.
  */
 function calculateSubtotal (){
    var subtotal = 0;
    var values = Object.values(CART);
    var length = values.length;

    for (let index = 0; index < length; index++) {
        const element = values[index];
        let price = calculatePrice(
            element.printSize, 
            element.frameStyle, 
            element.frameWidth, 
            element.matWidth);

        subtotal += price;
    }
    return subtotal;
 }

 /**
  * Toogles the Pay Button.
  * 
  * @param {bool} value The Value to disable or enable the Pay Button.
  */
 function disablePayButton (value){
    document.getElementById('pay-button').disabled = value;
 }

/**
   * Sets the options for the selection elements with input from the global destinations array.
   * Also displays shipping costs of the first selection option.
   */
function setShippingDestinations (){
    var selectionElement = document.getElementById ('country');

    for (let i = 0; i < DESTINATIONS.length; i++) {
        const element = DESTINATIONS[i];

        let optionElement = document.createElement('option');
        optionElement.innerHTML = element.displayName;
        optionElement.setAttribute('value', element.country);
        selectionElement.appendChild(optionElement);       
    }
    // Set Price of first element
    setShippingCosts (DESTINATIONS[0].country);
}

/**
 * Looks up the shipping costs of a countries name in the global destinations array.
 * 
 * @param {string} name The Name of the country to get the shipping costs of.
 * @returns If the country exists, the according costs are returned. Returns an mdash on failure.
 */
function getCostsByCountryName(name){

    for (let i = 0; i < DESTINATIONS.length; i++) {
        const destination = DESTINATIONS[i];
        if (destination.country == name)
            return destination.cost;      
    }}

/**
 * Updates the shipping costs span.
 * 
 * @param {string} country_name The name of the country to update the shipping costs.
 */
function setShippingCosts (country_name){
    SHIPPING_COSTS = getCostsByCountryName(country_name);

    const shippingCostElement = document.getElementById('price-shipping');
    shippingCostElement.innerHTML = formatCosts(SHIPPING_COSTS);
}

/**
 * Converts cent to euro.
 * 
 * @param {string} costs The cent amount to convert to euro.
 */
function formatCosts (costs){
    return (costs / 100).toFixed(2);
}

/**
 * ************************* Event Listeners *********************************
 */

 /**
  * Adds all needed event listeners.
  */
 function addEventListeners(){
    onCountrySelectionChange();
}

/**
 * When country selection changes the shipping costs are updated.
 */
function onCountrySelectionChange(){
    const selectElement = document.getElementById('country');

    selectElement.addEventListener('change', );
}