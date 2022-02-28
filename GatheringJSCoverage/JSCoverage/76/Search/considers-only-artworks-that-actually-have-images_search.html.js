
    import {Artwork} from './search-result.js';
    import {ArtworkContainer} from './search-dom.js';
    import * as ArtworkAPI from './search-api.js'; 
    /*
             * Retrieves artworks and inserts into document container
             */
       
           function updateCart() {
      let storage = window.localStorage;
      if (storage.getItem("cart")) 
    }
      
      
      
      
      
      const artworkContainer = new ArtworkContainer();
      
      updateCart();
 
      
        
      
      
      async function artworkSearch(searchQuery) {
          const artworkContainer = new ArtworkContainer();
          artworkContainer.clear();
          
          const artworks = await ArtworkAPI.searchArtworks(searchQuery);}
      
      
      
       document.addEventListener('DOMContentLoaded', event => {
                //ingredients
                const params = (new URL(document.location)).searchParams;
                const searchQuery = params.get('q');
                if(!searchQuery) 
                document.getElementById('search').value = searchQuery;
                document.getElementById('search-info').innerText="Searching for “"+searchQuery+"”...";
                artworkSearch(searchQuery);
            });
      
      
      
      const searchInput = document.getElementById('search');
       
      
      
      
            searchInput.addEventListener('click', );

            const form = document.getElementById('main-form');
            form.addEventListener('submit', );
      
  