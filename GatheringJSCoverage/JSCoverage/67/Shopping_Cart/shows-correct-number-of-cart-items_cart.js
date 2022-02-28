import { fetchObject, retrieveCart, showCartItems } from "./common.js";
import { calculatePrice, render } from './frame.js';

/*localStorage.setItem('cart', JSON.stringify([
  { objectID: 435844, printSize: 'S', frameStyle: 'classic', frameWidth: 22, matColor: 'ivory', matWidth: 40 },
  { objectID: 435852, printSize: 'M', frameStyle: 'elegant', frameWidth: 33, matColor: 'indigo', matWidth: 60 },
  { objectID: 436950, printSize: 'M', frameStyle: 'shabby', frameWidth: 44, matColor: 'wine', matWidth: 80 },
  { objectID: 201957, printSize: 'L', frameStyle: 'natural', frameWidth: 55, matColor: 'mint', matWidth: 100 },
]));*/

const section = document.querySelector('section');
const totalPrice = document.getElementById('price-total');
const removeButton = document.getElementsByClassName('cart-remove');

const printSizes = {
  S: 'Small',
  M: 'Medium',
  L: 'Large',
}

const renderSingleItem = 

const calculateAndSetCartPrice = (cart) => {
  let subtotal = 0;
  for (const item of cart) 
  totalPrice.innerHTML = parseFloat(subtotal).toFixed(2);
};

window.removeCartItem = 


const main = async () => {
  showCartItems();
  let cart = retrieveCart();

  if (cart) {
    let items = await Promise.all(cart.map());

    items.forEach( );

    calculateAndSetCartPrice(cart);
    return;
  }}

main();
