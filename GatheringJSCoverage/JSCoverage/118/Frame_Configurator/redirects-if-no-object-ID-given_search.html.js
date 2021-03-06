
    import { Artwork } from './artwork.js';
    import * as ACache from './artwork-cache.js';
    import { updateCartItemsNumber } from "./cart-numbers.js";

    updateCartItemsNumber();

    const gallery = document.getElementById('gallery');

    const loadHighlights = async () => {
      gallery.innerHTML = '';

      const text = document.getElementById('search-info');
      text.innerText = `Search our collection of more than 400,000 artworks.`;

      var highlights_json = ACache.retrieve('');

      if (!highlights_json) {
        var response = await fetch(`./highlights.json`).then(result => result.json());
        var highlights = JSON.parse(`{}`);
        highlights['total'] = response['highlights'].length;
        highlights['objectIDs'] = response['highlights'];

        highlights_json = await fetchObjectsFromAPI(highlights);}



    const search = 




    




    async function fetchObjectsFromAPI(response) {
      const total = response.total;

      if (total === 0) 

      const amountDisplayed = Math.min(total, 100);
      var artworks_json = JSON.parse(`{}`);
      var promises = [];


      for (let i = 0; i < amountDisplayed; i++) {

        promises.push(fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${response['objectIDs'][i]}`)
                .then(result => result.json())
                .then());
      }

      return Promise.all(promises)
              .then()
    }




    




    

    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');

    document.addEventListener('DOMContentLoaded', () => {

      if (q === null ) {
        loadHighlights();
      }
    });

    const form = document.querySelector('#search_input');
    form.addEventListener('submit', );

  