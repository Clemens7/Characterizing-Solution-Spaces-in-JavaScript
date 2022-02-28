
    import * as Cache from './cache.js'
    import * as Common from './common.js'

    const MET_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/';
    //const MET_BASE_URL = 'http://localhost:4445/';
    //Query parameter set via URL
    document.addEventListener('DOMContentLoaded', event => {
      event.preventDefault();
      document.getElementById('cart-link').innerText = `Cart (${Common.getNumberOfObjectsInCart()})`;
      const params = (new URL(document.location)).searchParams;
      const query = params.get('q');
      if (!query) 
      metSearch(query);
    });


    

    

    

    //Updates page and queries met Api
    async function metSearch(searchTerm) {
      let searchInfo = document.getElementById('search-info');
      searchInfo.textContent = `Searching for “${searchTerm}”...`;
      const numberOfArtworks = await retrieveArtworksByTerm(searchTerm);

      let artworksString = "artworks";
      if (numberOfArtworks == 1) 
      searchInfo.textContent = `Found ${numberOfArtworks}  ${artworksString} for “${searchTerm}”`;
      return;
    }

    const displayArtwork = artwork => {
      return new Promise((resolve, reject) => {
        return setTimeout(() => resolve(gallery.innerHTML += createArtworkElement(artwork, artwork.objectID)), 200)
      })
    }

    async function retrieveArtworksByTerm(searchTerm) {
      const response = await fetch(`${MET_BASE_URL}search?hasImages=true&q=${searchTerm}`);
      const rawData = await response.json();

      if (rawData.total == 0) 

      const objectIDs = rawData.objectIDs;
      if (rawData.total > 100) {
        objectIDs.splice(100);
      }

      // objectIDs.splice(1);

      console.log(rawData.objectIDs);

      const gallery = document.getElementById('gallery');
      gallery.innerHTML = '';

      Promise.all(
        objectIDs.map(async id => {
          let artwork = Cache.retrieve(id);
          if (!artwork) {
            artwork = await Common.retrieveArtworksById(id);
            storeInCache(id, artwork);
          }
          displayArtwork(artwork);
        })
      )
      console.log(objectIDs.length);

      return objectIDs.length;
    }

    async function storeInCache(id, artwork) {
      Cache.store(id, artwork);
    }


    function createArtworkElement(artwork, objectID) {
      const artworkHtml =
        `<div class="thumb">
          <a href="./config.html?objectID=${objectID}" id="object-${objectID}">
            <img src="${artwork.primaryImageSmall}" alt="${artwork.title}" id="object-image-${objectID}">
              <div class="museum-label">
                <span class="artist">${artwork.artistDisplayName}</span>
                <span class="title">${artwork.title}</span>,
                <span class="date">${artwork.objectDate}</span>
              </div>
          </a>
        </div>`;
      return artworkHtml;

    }

  