
    import { searchArt, getArtById } from './apiCalls.js'
    import { render, getPrintSizes, calculatePrice } from './frame.js'
    import { store, retrieve } from './metCache.js'

    const hLights = [39799, 459055, 437853, 435809, 436535, 360018, 634108, 459080, 435882, 271890, 459054, 436105];

    const urlParams = new URLSearchParams(window.location.search);
    let searchTerm = urlParams.get('q');
    const maxVisibleResults = 100;
    let searchResults = {};

    const updateResults = async () => {
      if (searchTerm && !searchResults.objectIDs) 
      if (!searchTerm) 
      const artObjects = await Promise.all(
        searchResults.objectIDs.slice(0, maxVisibleResults).map(async objectID => {
          let artObject = retrieve(objectID)
          if (!artObject) 
          return artObject;
        })
      )
      console.log('artObjects', artObjects);
      const galleryNode = document.getElementById('gallery')
      artObjects.forEach((artObject, i) => {
        if (!artObject.primaryImageSmall) 

        // Create html element
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("thumb");
        itemDiv.innerHTML = `
          <a href="config.html?objectID=${artObject.objectID}" id="object-${i}">
            <img src="${artObject.primaryImageSmall}" alt="${artObject.title}" id="object-image-${i}">
            <div class="museum-label">
              <span class="artist">${artObject.artistDisplayName}</span>
              <span class="title">${artObject.title}</span>,
              <span class="date">${artObject.objectDate}</span>
            </div>
          </a>`;
        galleryNode.appendChild(itemDiv);
      })
      if (searchTerm) {
        document.getElementById('search-info').innerHTML = `Found ${searchResults.objectIDs.length} artwork${searchResults.objectIDs.length === 1  : 's'} for “${searchTerm}”`
      }
    }

    const startSearch = async searchTerm => {
      searchResults = await searchArt(searchTerm)
      updateResults()
    }

    document.addEventListener('DOMContentLoaded', async e => {
      const cart = JSON.parse(window.localStorage.getItem('cart'));
      if (cart ) 

      if (!searchTerm)  else {
        document.getElementById('search-info').innerHTML = `Searching for “${searchTerm}”...`
      }

      document.getElementById('search').value = searchTerm;
      startSearch(searchTerm);
    })
    
  