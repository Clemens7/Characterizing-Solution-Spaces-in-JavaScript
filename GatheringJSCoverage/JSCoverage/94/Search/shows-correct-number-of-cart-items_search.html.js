
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
    if(!(cart===undefined) && cart.length > 0) 
  });

  const form = document.querySelector('.search-form');
  form.addEventListener('submit', );

 async function searchObjects(q){
    clearChildren();
	if(!q) {
		showHighlights();
		return;
	}}
 
 
 
 
 
 
 
 function displayElements(elements) {
    for(var i = 0; i < elements.length; ++i) {
        var obj = elements[i];
        var templateCopy = template.cloneNode(true);
        setupElement(templateCopy, obj);
        templateContainer.appendChild(templateCopy); 
    }
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

 async function retrieveObjects(objectIDs){
    const artObjects = await artmartAPI.getObjects(objectIDs);
    console.log(artObjects);
	return artObjects;
 }

  function clearChildren() {
    while (templateContainer.firstChild) {
      templateContainer.removeChild(templateContainer.lastChild);
    }
  }
  
  async function loadHighlights() {
	if(highlights)
		
	console.log("loading highlights");
    highlights = await fetch("./highlights.json");
    highlights = await highlights.json();
  }

  async function showHighlights() {
	await loadHighlights();
    if(highlights) {
      clearChildren();
      let objects = await retrieveObjects(highlights.highlights);
      displayElements(objects);
    }
  }

