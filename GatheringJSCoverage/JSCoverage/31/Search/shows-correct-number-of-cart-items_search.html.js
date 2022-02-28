
    // If you want to test module imports locally, set up a local testing server
    // https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server
    import { Artwork } from './search.js';
    import { ArtworkDocumentContainer } from './search.js';
    import * as ArtworkAPI from './search.js';
    import { numberOfEntries } from './cart-storage.js';

    /*
     * Retrieves recipes and inserts into document container
     */
    

    async function defaultArtworkSearch() {
      const artworkContainer = new ArtworkDocumentContainer();
      artworkContainer.clear();
      const artworks = [39799, 459055, 437853, 435809, 436535, 360018, 634108, 459080, 435882, 271890, 459054, 436105];
      for (let artworkID of artworks) {
        ArtworkAPI.getArtworkById(artworkID).then(
          (artwork) => artworkContainer.addArtworkToDocument(artwork)
        );
      }
    }

    document.addEventListener('DOMContentLoaded', event => {

      const numberOfCartItems = numberOfEntries();
      if (numberOfCartItems ) 
      const params = (new URL(document.location)).searchParams;
      const Query = params.get('q');
      if (!Query) {
        defaultArtworkSearch();
        return;
      }});

    //const searchInput = document.getElementById('q');
    //searchInput.addEventListener('click', event => event.target.style.border = '');

    /* const form = document.querySelector('#search form');
    form.addEventListener('submit', event => {
      //event.preventDefault();
        const searchInput = document.getElementById('q');
        if(!searchInput.value) {
            searchInput.style.border = "1px solid red";
            //prevents default HTML form behavior on submitting
            event.preventDefault();
        }
    }); */
  