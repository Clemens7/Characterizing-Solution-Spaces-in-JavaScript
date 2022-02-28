
    import * as MetAPI from './met/met-api.js';
    import { SearchDocumentContainer } from './dom-manipulator/search.js';
    import {getCartItemCount} from "./cache/cart-cache.js";

    /*
     * Retrieves artworks and inserts them into document container
     */
    

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
      if(!query) {
        highlightedSearch();
        return;
      }});

    async function highlightedSearch() {
      const highlights = await fetch('highlights.json');
      const data = await highlights.json();
      const highlightedArtworks = await MetAPI.getHighlightSearchResult(data.highlights);
      if(!highlightedArtworks) 
      const searchDocumentContainer = new SearchDocumentContainer();
      searchDocumentContainer.clear();
      for(let artwork of highlightedArtworks) {
        searchDocumentContainer.addArtworkToDocument(artwork);
      }
    }


    const form = document.querySelector('main');
    form.addEventListener('submit', );

  