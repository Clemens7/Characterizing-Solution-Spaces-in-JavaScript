import * as Frame from "./frame.js";
import {CartItem} from "./cart-item.js";
import {Shipping} from "./shipping.js";
import * as ElementCreator from './element-creator.js';

export function calculateSubtotal(){
  var parsed_Objs = [], rawData = [];
  var total = 0;
  var cartArray = JSON.parse(localStorage.getItem("cart") );
  parsed_Objs = cartArray.map(obj => {
      return new CartItem(obj.objectID, obj.printSize, obj.frameStyle, obj.frameWidth, obj.matColor, obj.matWidth);
  });
  for (let obj of parsed_Objs) {
      total += Frame.calculatePrice(obj.printSize, obj.frameStyle, obj.frameWidth, obj.matWidth);
  }
  return parseFloat(total);
}

export async function getShipping(){
  var parsed_Objs = [];


  async function getShippingInfo() {
    var response = await fetch(`https://web-engineering.big.tuwien.ac.at/s20/a2/shipping`);
    return await response.json();
  }

  return await getShippingInfo().then(shipping => {
    if (shipping.destinations === undefined || shipping.destinations.length == 0) else{
      document.getElementById("pay-button").disabled = false;
      parsed_Objs = shipping.destinations.map(obj => {
          const item = new Shipping(obj.country, obj.displayName, obj.cost);
          return item;
      });
      return parsed_Objs;
    }
   }).catch();


}

export function getShippingPrice(value, shipping){
  for(let country of shipping){
    if(value === country.country){
      return (country.cost/100).toFixed(2);
    }
  }}

export function calculateTotal(value, shipping){
  var parsed_Objs = [], rawData = [];
  var total = 0;
  var cartArray = JSON.parse(localStorage.getItem("cart") );
  parsed_Objs = cartArray.map(obj => {
      return new CartItem(obj.objectID, obj.printSize, obj.frameStyle, obj.frameWidth, obj.matColor, obj.matWidth);
  });
  for (let obj of parsed_Objs) {
      total += Frame.calculatePrice(obj.printSize, obj.frameStyle, obj.frameWidth, obj.matWidth);
  }
  for(let country of shipping){
    if(value === country.country){
      total += (country.cost / 100);
      return total.toFixed(2);
    }
  }}

export function addShippingToContainer(shipping){
  var parent = document.getElementById("country");
  for(var n = 0; n < shipping.length; n++){
      const options = ElementCreator.create_TextElement('option', shipping[n].displayName, {value: shipping[n].country}, 'option');
      parent.appendChild(options);
  }

}
