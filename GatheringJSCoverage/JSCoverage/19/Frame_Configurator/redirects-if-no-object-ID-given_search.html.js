

    import { Artwork } from './artwork.js';
    import * as ArtworkAPI from './artwork-api.js';
    import { ResultContainer } from './artwork-dom.js';


    /* Refactor getting cart cache */
    if ('cart' in localStorage) 

    document.addEventListener('DOMContentLoaded', event => {
        const params = (new URL(document.location)).searchParams;
        let searchQuery = params.get('q');
        if (searchQuery) 
        document.getElementById('search').value = searchQuery;
        artworkSearch(searchQuery);
      });
    
    const form = document.getElementById('search-form');
    form.addEventListener('submit', );

    async function artworkSearch(artworkName) {
      const resultContainer = new ResultContainer();
      resultContainer.clear();

      if (!artworkName) {
        displayHighlights(resultContainer);
        return;
      }}

    async function displayHighlights(resultContainer) {
      const highlightObject = await ArtworkAPI.retrieveHighlights();
      const objectIds = highlightObject.highlights;
      Promise.all(
        objectIds.map(async id => {
          const artwork = await ArtworkAPI.retrieveObject(id);}
        )
      );
    }

    


  