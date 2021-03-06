
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
    let result = await artmartAPI.search(q);
    console.log("done!")
    if(!result || !result.objectIDs){
      console.log(`No objects could be found for: ${q}`);
	  setSearchText(formatTextFinished(0, q)); //Workaround
      return;
    }}
 
 function formatTextFinished(results, searchQuery) {
	return 'Found ' +  results + ' ' + artworkText(results) + ' for “' + searchQuery + '”'; //No string formatting? Webdev is a hellscape!
 }
 
 function setSearchText(str) {
	document.getElementById('search-info').innerText = str;
 }
 
 function artworkText(n) {
	if(n != 1)
		return "artworks";
 }
 
 
 
 

 

  function clearChildren() {
    while (templateContainer.firstChild) {
      templateContainer.removeChild(templateContainer.lastChild);
    }
  }
  
  

  

