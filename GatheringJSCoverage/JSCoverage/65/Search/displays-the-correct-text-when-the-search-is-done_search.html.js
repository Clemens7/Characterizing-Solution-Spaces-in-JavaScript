
      import { Artwork } from "./Artwork.js";
      import { ArtworkDocumentContainer, SearchTextContainer, createArtworkElement } from "./artwork-dom.js";
      import * as ArtworkAPI from "./artwork-api.js";
      import { diplayCartItems } from "./cart.js";

      const form = document.querySelector('.search-form');


      document.addEventListener('DOMContentLoaded', async (event) => {
          diplayCartItems()
          const params = (new URL(document.location)).searchParams;
          const searchInputQuery = params.get('q');
          if(!searchInputQuery) 
          document.getElementById('search').value = searchInputQuery;
          const searchInputs = searchInputQuery.split(',');
          artworkSearch(searchInputs);
      });

      async function artworkSearch(searchInput) {
          const searchContainer = new SearchTextContainer();
          searchContainer.clear();
          searchContainer.createSearchTextSearching(searchInput);

          const artworkPromises = await ArtworkAPI.retrieve(searchInput)

          if (!artworkPromises) {
              searchContainer.clear();
              searchContainer.createSearchTextReset();
              searchContainer.createSearchTextDone(searchInput, 0)
              return;
          }}

  