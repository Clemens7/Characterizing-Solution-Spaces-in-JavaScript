
    import * as ArtCache from './art-cache.js';
    import {Art} from './search.js';
    import * as ArtAPI from './art-search-api.js';
    import {ArtDocumentContainer} from './art-dom.js';

    
    /*
     * Retrieve arts and insert into document container
     */
    async function artSearch(searchTerm){
      const artContainer = new ArtDocumentContainer();
      if(searchTerm !== '')
      artContainer.clear();
      const artsLength = await ArtAPI.retrieve(searchTerm);
      if(searchTerm !== '')
    }

     async function retrieveCart(){
      let cartItems = ArtCache.retrieve('cart');
      if(cartItems !== undefined 
    }

    document.addEventListener('DOMContentLoaded', event => {
      retrieveCart();
      const params = (new URL(document.location)).searchParams;
      const searchQuery = params.get('q');
      
      if(!searchQuery){
        artSearch('');
      }
      
    })

    const form = document.querySelector('.search-form');
    form.addEventListener('submit', );

  