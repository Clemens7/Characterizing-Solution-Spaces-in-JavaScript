
import * as DAL from './DAL.js';

document.addEventListener('DOMContentLoaded', event => {
  document.getElementById("cart-link").innerText = `Cart${getNumOfItems()}`;
  const params = (new URL(document.location)).searchParams;
  const helpquery = params.get('q');
  if(!helpquery) 
  else{
    var query= helpquery.replace(/%2B/g, " ");
    document.getElementById('search').value = query;
    search(query);
  }
});

const searchInput = document.getElementById('search');
searchInput.addEventListener('click', );

const form = document.getElementById("search-form");
form.addEventListener('submit', );




  function search(queryString)
  {
    var text= `Searching for “${queryString}”...`;
    document.getElementById("search-info").innerHTML = text;
    DAL.getPictures(queryString).then(); 
  }





  function getNumOfItems() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if(cart)
    
   return '';
  }

