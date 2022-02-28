
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

      if(q) { // if q is set, display "Searching for “<term>”..."
        document.getElementById('search-info').innerHTML = 'Searching for “' + q + '”...';
      }

      cartItemsElement.update(); // update number of cart items in navbar

      searchCollection(q);
    });

    async function searchCollection(queryParam) {
      let searchResultObject; // search results (total number of objects, array of object ids)
      let museumObjects; // array of objects of the search result

      if(!queryParam)  else { // fetch object ids from api (filtered by the given search term)
        searchResultObject = await MMCollectionAPI.searchCollection(queryParam);) + ' for “' + queryParam + '”';
      }}

  