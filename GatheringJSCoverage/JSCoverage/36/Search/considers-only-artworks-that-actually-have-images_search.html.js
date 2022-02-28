
    import * as MetAPI from './met/met-api.js';
    import { SearchDocumentContainer } from './dom-manipulator/search.js';
    import {getCartItemCount} from "./cache/cart-cache.js";

    /*
     * Retrieves artworks and inserts them into document container
     */
    async function artworkSearch(searchTerm) {
      document.getElementById('search-info').innerText = `Searching for “${searchTerm}”...`;
      const artworks = await MetAPI.getSearchResults(searchTerm);;
      document.getElementById('search-info').innerText = `Found ${artworks.length} ${pluralString} for “${searchTerm}”`;
      if(!artworks) }

    /**
     synchronized url and search bar input
     */
    document.addEventListener('DOMContentLoaded', event => {
      // update 'Cart' label with number of cart items
      const cartItemCount = getCartItemCount();
      const cartItemsString = cartItemCount === 0 ? '' ;
      document.getElementById('cart-link').innerText = `Cart${cartItemsString}`;

      const params = (new URL(document.location)).searchParams;
      const query = params.get('q');
      if(!query) 
      document.getElementById('search').value = query;
      artworkSearch(query);
    });

    


    const form = document.querySelector('main');
    form.addEventListener('submit', );

  