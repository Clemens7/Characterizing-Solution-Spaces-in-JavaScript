
      import { Artwork } from "./Artwork.js";
      import { ArtworkDocumentContainer, SearchTextContainer, createArtworkElement } from "./artwork-dom.js";
      import * as ArtworkAPI from "./artwork-api.js";
      import { diplayCartItems } from "./cart.js";

      const form = document.querySelector('.search-form');


      document.addEventListener('DOMContentLoaded', async (event) => {
          diplayCartItems()
          const params = (new URL(document.location)).searchParams;
          const searchInputQuery = params.get('q');
          if(!searchInputQuery) {
            const artworkPromises = await ArtworkAPI.highlights()
            const artworkContainer = new ArtworkDocumentContainer();
            artworkContainer.clear();
            const artworks = await Promise.all(artworkPromises)
            document.querySelector('#gallery').append(...artworks.map(createArtworkElement))
            return
          }});

      

  