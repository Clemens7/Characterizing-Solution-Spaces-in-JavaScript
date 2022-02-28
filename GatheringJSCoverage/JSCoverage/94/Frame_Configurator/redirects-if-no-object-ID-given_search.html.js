
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
	if(!q) {
		showHighlights();
		return;
	}}
 
 
 
 
 
 
 
 
 
 

 async function retrieveObjects(objectIDs){
    const artObjects = await artmartAPI.getObjects(objectIDs);}

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
      let objects = await retrieveObjects(highlights.highlights);}

