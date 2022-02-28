
 import artmartAPI from "./artmartAPI.js";
 import {retrieveCart} from "./artmart-cache.js";
 
 var template;
 var templateContainer;
 var highlights; // saved highlights

  document.addEventListener('DOMContentLoaded', async (event) => {
      const urlParams = new URLSearchParams(window.location.search);
      const qParam = urlParams.get("q");
	  template = document.getElementById('template');
	  templateContainer = template.parentNode;
    templateContainer.removeChild(template);
	
	document.getElementById('search').value = qParam;
    searchObjects(qParam);
	
    // update cart 
    const cart = retrieveCart();
    if(!(cart===undefined) ) 
  });

  const form = document.querySelector('.search-form');
  form.addEventListener('submit', );

 async function searchObjects(q){
    clearChildren();
	if(!q) 
    console.log("searching...")
    document.getElementById('search-info').innerText = 'Searching for “' + q + '”...';
    let result = await artmartAPI.search(q);}
 
 
 
 
 
 
 
 
 
 

 

  function clearChildren() {
    while (templateContainer.firstChild) {
      templateContainer.removeChild(templateContainer.lastChild);
    }
  }
  
  

  

