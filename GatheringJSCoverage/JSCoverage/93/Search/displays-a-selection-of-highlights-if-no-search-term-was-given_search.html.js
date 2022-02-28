
    import * as MMCollectionAPI from './metmuseum-collection-api.js';
    import {SearchDocumentContainer, CartItemsElement} from "./dom-utils.js";
    import {SearchResultObject} from "./api-responses.js";

    const maxResults = 100; // maximum amount of results/objects to be displayed
    const searchDocumentContainer = new SearchDocumentContainer('gallery');
    const cartItemsElement = new CartItemsElement('cart-link');

    document.addEventListener('DOMContentLoaded', _ => {
      // get query param q
      const params = (new URL(document.location)).searchParams;
      const q = params.get('q');

      if(q) 

      cartItemsElement.update(); // update number of cart items in navbar

      searchCollection(q);
    });

    async function searchCollection(queryParam) {
      let searchResultObject; // search results (total number of objects, array of object ids)
      let museumObjects; // array of objects of the search result

      if(!queryParam) { // if no search term is given, fetch object ids from highlights
        try {
          const response = await fetch("highlights.json");
          const responseJson = await response.json();
          searchResultObject = new SearchResultObject(responseJson.highlights.length, responseJson.highlights);
        } 
      }

      // fetch all objects with the given ids
      museumObjects = await Promise.all(searchResultObject.objectIDs.slice(0,maxResults).map(id => MMCollectionAPI.getObject(id)));

      // display objects in DOM
      searchDocumentContainer.clear();
      museumObjects.forEach(o => searchDocumentContainer.addMuseumObject(o));
    }

  