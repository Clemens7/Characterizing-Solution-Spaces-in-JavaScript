
    import * as Helper from './helper.js';
    const MET_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1/";

    // TODO: Check for Cart Items everytime the page (re)loads
    Helper.cartItemsSize();
    
    // Fires every time the page is (re)loaded
    document.addEventListener('DOMContentLoaded', event => {
      const searchQuery = new URLSearchParams(window.location.search).get("q"); // https://www.w3schools.com/jsref/prop_loc_search.asp | https://developer.mozilla.org/de/docs/Web/API/URLSearchParams
      
      if (searchQuery){
        // Actually search
        document.getElementById("search").value = searchQuery; // When searched via URL, automatically add the search querry to the search form.
        document.getElementById("search-info").innerHTML = `Searching for &ldquo;${searchQuery}&rdquo;...`;
        searchArtworks(searchQuery)
          .then();
      }
      
    });

    // Prevent default when nothing in searchbar (Website should not be loaded)
    const searchform = document.querySelector('main .search-form');
    searchform.addEventListener('submit', );

    

    async function searchArtworks(searchQuery) {
      const searchUrl = MET_API_URL + 'search?hasImages=true&q=' + encodeURI(searchQuery);

      const response = await fetch(searchUrl)) }

    
    
    

  