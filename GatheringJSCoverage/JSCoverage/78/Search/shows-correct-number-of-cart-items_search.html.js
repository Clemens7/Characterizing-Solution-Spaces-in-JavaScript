
    import * as Helper from './helper.js';
    const MET_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1/";

    // TODO: Check for Cart Items everytime the page (re)loads
    Helper.cartItemsSize();
    
    // Fires every time the page is (re)loaded
    document.addEventListener('DOMContentLoaded', event => {
      const searchQuery = new URLSearchParams(window.location.search).get("q"); // https://www.w3schools.com/jsref/prop_loc_search.asp | https://developer.mozilla.org/de/docs/Web/API/URLSearchParams
      
      if (searchQuery) else {
        // No search, show highlights
        showHighlights();
      }
      
    });

    // Prevent default when nothing in searchbar (Website should not be loaded)
    const searchform = document.querySelector('main .search-form');
    searchform.addEventListener('submit', );

    async function showHighlights() {
      const response = await fetch('./highlights.json');
      const data = await response.json();
      // console.log(data);
      data.highlights.map(objID => getObject(objID).then(addItem));
    }

    

    async function getObject(objectID) {
      const objectUrl = MET_API_URL + 'objects/' + objectID;

      // Load item if availabel in cache
      let item = JSON.parse(localStorage.getItem(objectID));
      if (!item) 
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

  