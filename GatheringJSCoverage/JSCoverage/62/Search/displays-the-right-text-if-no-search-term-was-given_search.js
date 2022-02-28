
import * as DAL from './DAL.js';

document.addEventListener('DOMContentLoaded', event => {
  document.getElementById("cart-link").innerText = `Cart${getNumOfItems()}`;
  const params = (new URL(document.location)).searchParams;
  const helpquery = params.get('q');
  if(!helpquery) {
    DAL.getPictures("highlights").then(); 
  }
});

const searchInput = document.getElementById('search');
searchInput.addEventListener('click', );

const form = document.getElementById("search-form");
form.addEventListener('submit', );




  





  function getNumOfItems() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if(cart)
    
   return '';
  }

