
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
 
      
        async function loadDefaultHighlights(){
           const res = await fetch("./highlights.json");
           const rawData = await res.json();
          const highlights = await rawData;                                            
          
             
              artworkContainer.clear();
                let array= Object.values(highlights);
              array[0].forEach(async function(element) {
                  
              let highlight = await ArtworkAPI.retrieveArtwork(element);
              
              artworkContainer.addArtworkToDocument(highlight);
              
          });
      }
      
      
      
      
      
      
       document.addEventListener('DOMContentLoaded', event => {
                //ingredients
                const params = (new URL(document.location)).searchParams;
                const searchQuery = params.get('q');
                if(!searchQuery) {
                    loadDefaultHighlights();
                    return;
                }});
      
      
      
      const searchInput = document.getElementById('search');
       
      
      
      
            searchInput.addEventListener('click', );

            const form = document.getElementById('main-form');
            form.addEventListener('submit', );
      
  