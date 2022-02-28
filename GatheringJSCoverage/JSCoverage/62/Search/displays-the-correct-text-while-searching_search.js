
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
    DAL.getPictures(queryString).then(objects =>
      {
        var html="";
        for(var object of objects)
        {
          html += makeHtml(object);
        }
        if(objects.length==1)
        
        else
        {
          document.getElementById("search-info").innerHTML= `Found ${objects.length} artworks for “${queryString}”`; 
        }
                      
        document.getElementById("gallery").innerHTML = html;
      }); 
  }



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

