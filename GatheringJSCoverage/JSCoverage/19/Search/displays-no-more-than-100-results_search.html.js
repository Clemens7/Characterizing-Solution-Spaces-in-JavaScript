

    import { Artwork } from './artwork.js';
    import * as ArtworkAPI from './artwork-api.js';
    import { ResultContainer } from './artwork-dom.js';


    /* Refactor getting cart cache */
    if ('cart' in localStorage) 

    document.addEventListener('DOMContentLoaded', event => {
        const params = (new URL(document.location)).searchParams;
        let searchQuery = params.get('q');
        if (searchQuery) {
          searchQuery = searchQuery.replace('+', ' ');
        }
        document.getElementById('search').value = searchQuery;
        artworkSearch(searchQuery);
      });
    
    const form = document.getElementById('search-form');
    form.addEventListener('submit', );

    async function artworkSearch(artworkName) {
      const resultContainer = new ResultContainer();
      resultContainer.clear();

      if (!artworkName) 

      const searchText = document.getElementById('search-info')
      searchText.innerText = `Searching for “${artworkName}”...`;
      const responseObjectIds = await ArtworkAPI.retrieveIds(artworkName);
      let objectIdsUnsliced = responseObjectIds.objectIDs;
      const amountOfRetrievedIds = responseObjectIds.total;
      if (amountOfRetrievedIds === 0)  else {
        displayFoundArtworks(objectIdsUnsliced, resultContainer);
        searchText.innerText = amountOfRetrievedIds === 1  : `Found ${amountOfRetrievedIds} artworks for “${artworkName}”`;
      }
    }

    

    async function displayFoundArtworks(objectIdsUnsliced, resultContainer) {
      const objectIds = objectIdsUnsliced.slice(0, 100);
      const a = await Promise.all(
        objectIds.map(async id => {
          const artwork = await ArtworkAPI.retrieveObject(id);
          resultContainer.addArtwork(artwork);
        }
        )
      )
    }


  