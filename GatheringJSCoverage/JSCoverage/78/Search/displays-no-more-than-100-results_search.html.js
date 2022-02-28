
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
            objectIDs.map(objID => getObject(objID).then(addItem));
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
      if (!results || results.total == 0) 
      return results;
    }

    async function getObject(objectID) {
      const objectUrl = MET_API_URL + 'objects/' + objectID;

      // Load item if availabel in cache
      let item = JSON.parse(localStorage.getItem(objectID));
      if (!item) {
        // If there are no data in cache (local storage), load from api
        const response = await fetch(objectUrl);
        item = await response.json();

        // Save item object in local storage (only strings possible)- LocalStorage (https://www.youtube.com/watch?v=AUOzvFzdIk4)
        let itemSerialized = JSON.stringify(item);
        localStorage.setItem(item.objectID, itemSerialized)
      }
      // console.log(item);
      // console.log(localStorage);
      return item;
    }
    
    function addItem(item) {
      const thumb = document.createElement("div");
      thumb.classList.add("thumb");
      thumb.innerHTML = `
          <a href="config.html?objectID=${item.objectID}" id="object-${item.objectID}">
            <img src="${item.primaryImageSmall}" alt="${item.title}" id="object-image-${item.objectID}">
            <div class="museum-label">
              <span class="artist">${item.artistDisplayName}</span>
              <span class="title">${item.title}</span>,
              <span class="date">${item.objectDate}</span>
            </div>
          </a>`;
      document.getElementById("gallery").appendChild(thumb);
    }

  