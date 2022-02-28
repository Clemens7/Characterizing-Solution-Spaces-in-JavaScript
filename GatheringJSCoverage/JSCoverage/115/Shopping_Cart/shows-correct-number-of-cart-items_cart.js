import { loadObject, metAPI } from './metApi.js';
import { render, calculatePrice } from './frame.js';

const cart = document.getElementById('cart');

let items = localStorage.getItem('cart');

if (!items)  else {
	items = JSON.parse(items);
	document.getElementById('cart-link').textContent = `Cart (${items.length})`;

  Promise.all(items.map()).then( objects => {
    
    for(let i = 0; i < items.length; i++) 

    const cartRemoveButtons = document.querySelectorAll('.cart-remove');

    for(let j = 0; j < items.length; j++) });
  
  let priceTotal = 0.00;
    items.forEach();
  document.getElementById('price-total').textContent = `${priceTotal}`;

  

  
}