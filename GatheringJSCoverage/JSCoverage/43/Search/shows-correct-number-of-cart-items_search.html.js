
    import * as SearchAPI from '/search-api.js';
    import { Artwork } from '/artwork.js';
    import { ArtworkDocumentContainer } from '/artwork-dom.js';
    import * as CartCache from '/cart-cache.js';



    //Search for artworks
    ;

    //Main Event Listener
    document.addEventListener('DOMContentLoaded', event => {    

      const cache = CartCache.retrieve();
      const cart = document.getElementById('cart-link');
      if(cache){
        cart.innerHTML = `Cart (${cache.length})`;
      }
      const params = (new URL(document.location)).searchParams;
      let searchQuery = params.get('q');
      if(searchQuery == "null")
      else if(!searchQuery){
        SearchAPI.displayHighlights();
        return;
      }



      
});

    


