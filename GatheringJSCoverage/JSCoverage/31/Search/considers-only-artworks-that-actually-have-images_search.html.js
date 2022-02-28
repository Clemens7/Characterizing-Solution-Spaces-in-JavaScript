
    // If you want to test module imports locally, set up a local testing server
    // https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server
    import { Artwork } from './search.js';
    import { ArtworkDocumentContainer } from './search.js';
    import * as ArtworkAPI from './search.js';
    import { numberOfEntries } from './cart-storage.js';

    /*
     * Retrieves recipes and inserts into document container
     */
    async function artworkSearch(q) {
      const searchText = document.getElementById('search-info');
      searchText.innerHTML = `Searching for “${q}”...`;
      const artworks = await ArtworkAPI.retrieveArtwork(q);}

    

    document.addEventListener('DOMContentLoaded', event => {

      const numberOfCartItems = numberOfEntries();
      if (numberOfCartItems ) 
      const params = (new URL(document.location)).searchParams;
      const Query = params.get('q');
      if (!Query) 
      //document.getElementById('q').value = Query;
      //const ingredients = ingredientsQuery.split(',');
      artworkSearch(Query);
    });

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
  