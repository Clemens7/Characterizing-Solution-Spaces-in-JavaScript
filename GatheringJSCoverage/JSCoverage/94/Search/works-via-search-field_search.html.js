
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
    if(!result || !result.objectIDs)
    let {objectIDs} = result;
    
    //Only display first 100 entries
    objectIDs = objectIDs.slice(0, 100);

    setSearchText(formatTextFinished(objectIDs.length, q));

    objectIDs.forEach((o)=> {
      artmartAPI.getObject(o).then((loaded)=>{
        const templateCopy = template.cloneNode(true);
        setupElement(templateCopy, loaded);
        templateContainer.appendChild(templateCopy);
      });
    });
 }
 
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
 
 
 
 function setupElement(element,object) {
	var anchorElements = element.getElementsByTagName("a");
	var imgElements = element.getElementsByTagName("img");
	var artistElements = element.getElementsByClassName("artist");
	var titleElements = element.getElementsByClassName("title");
  var dateElements = element.getElementsByClassName("date");

	//Needs sanitization
	imgElements[0].src = object.primaryImageSmall;
	imgElements[0].alt = object.title;
	artistElements[0].textContent = object.artistDisplayName;
	titleElements[0].textContent = object.title;
	dateElements[0].textContent = object.objectDate;
	anchorElements[0].href = 'config.html?objectID=' + object.objectID;
 }

 

  function clearChildren() {
    while (templateContainer.firstChild) {
      templateContainer.removeChild(templateContainer.lastChild);
    }
  }
  
  

  

