
    import * as ArtCache from './art-cache.js';
    import {Art} from './search.js';
    import * as ArtAPI from './art-search-api.js';
    import {ArtDocumentContainer} from './art-dom.js';

    
    /*
     * Retrieve arts and insert into document container
     */
    async function artSearch(searchTerm){
      const artContainer = new ArtDocumentContainer();
      if(searchTerm !== ''){
        document.getElementById('search-info').innerHTML = `Searching for “${searchTerm}”...`;
      }
      artContainer.clear();
      const artsLength = await ArtAPI.retrieve(searchTerm);
      if(searchTerm !== ''){
        document.getElementById('search-info').innerHTML = `Found ${artsLength} ${artsLength == 1  : "artworks"} for “${searchTerm}”`;
      }
    }

     async function retrieveCart(){
      let cartItems = ArtCache.retrieve('cart');
      if(cartItems !== undefined 
    }

    document.addEventListener('DOMContentLoaded', event => {
      retrieveCart();
      const params = (new URL(document.location)).searchParams;
      const searchQuery = params.get('q');
      
      if(!searchQuery)else{
        document.getElementById('search').value = searchQuery;
        artSearch(searchQuery);
      }
      
    })

    const form = document.querySelector('.search-form');
    form.addEventListener('submit', );

  