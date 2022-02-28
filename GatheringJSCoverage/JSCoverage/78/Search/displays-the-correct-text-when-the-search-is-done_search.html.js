
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
          .then(results => {
            // console.log(results);
            const objectIDs = results.objectIDs.slice(0, 100); // Get only the first 100 results (ObjectIDs)
            // console.log(objectIDs);

            document.getElementById("search-info").innerHTML = `Found ${objectIDs.length} artwork${objectIDs.length == 1  : 's'} for &ldquo;${searchQuery}&rdquo;`;

            // For each object, get the data and display the item
            objectIDs.map();
          });
      }
      
    });

    // Prevent default when nothing in searchbar (Website should not be loaded)
    const searchform = document.querySelector('main .search-form');
    searchform.addEventListener('submit', );

    

    async function searchArtworks(searchQuery) {
      const searchUrl = MET_API_URL + 'search?hasImages=true&q=' + encodeURI(searchQuery);

      const response = await fetch(searchUrl)
      let results = await response.json();

      // console.log(results);

      // When no results, set objectIDs to empty array, default would be null
      if (!results || results.total == 0) {
        results = { total: 0, objectIDs: [] };
      }
      return results;
    }

    
    
    

  