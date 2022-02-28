
import * as DAL from './DAL.js';

document.addEventListener('DOMContentLoaded', event => {
  document.getElementById("cart-link").innerText = `Cart${getNumOfItems()}`;
  const params = (new URL(document.location)).searchParams;
  const helpquery = params.get('q');
  if(!helpquery) {
    DAL.getPictures("highlights").then(objects =>
      {
        var html="";
        for(var object of objects)
        {
          html += makeHtml(object);
        }
                        
        document.getElementById("gallery").innerHTML = html;
      }); 
  }
});

const searchInput = document.getElementById('search');
searchInput.addEventListener('click', );

const form = document.getElementById("search-form");
form.addEventListener('submit', );




  



function makeHtml(pic)
{
    var erg=  `<div class="thumb">
    <a href="./config.html?objectID=${pic.objectID}" id="object-${pic.objectID}">
      <img src="`+pic.primaryImageSmall+`" alt="" id="object-image-${pic.objectID}">
      <div class="museum-label">
        <span class="artist">`+pic.artistDisplayName+`</span>
        <span class="title">`+pic.title+`</span>,
        <span class="date">`+pic.objectDate+`</span>
      </div>
    </a>
  </div>`;
    
  return erg;
}

  function getNumOfItems() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if(cart)
    
   return '';
  }

