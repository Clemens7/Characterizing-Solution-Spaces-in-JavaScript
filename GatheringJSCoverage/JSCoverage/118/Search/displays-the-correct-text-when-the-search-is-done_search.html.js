
    import { Artwork } from './artwork.js';
    import * as ACache from './artwork-cache.js';
    import { updateCartItemsNumber } from "./cart-numbers.js";

    updateCartItemsNumber();

    const gallery = document.getElementById('gallery');

    const loadHighlights = 



    const search = async query => {
      const text = document.getElementById('search-info');
      text.innerText = `Searching for “${query}”...`;

      gallery.innerHTML = '';

      var artworks_json = ACache.retrieve(query);

      if (!artworks_json) {
        let response = await fetchIDsFromAPI(query);
        text.innerText = response.total === 1  : `Found ${response.total} artworks for “${query}”`;
        artworks_json = await fetchObjectsFromAPI(response);
        console.log(artworks_json);

        ACache.store(query, artworks_json);
        return;
      }}




    async function fetchIDsFromAPI(searchTerm) {
      const newSearchTerm = searchTerm.split(' ').join('+');
      console.log('URL: ', `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${newSearchTerm}`);

      let response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${newSearchTerm}`);

      return response.json();
    }




    async function fetchObjectsFromAPI(response) {
      const total = response.total;

      if (total === 0) {
        return;
      }}




    




    

    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');

    document.addEventListener('DOMContentLoaded', () => {

      if (q === null || q === '')  else {
        search(q);
      }
    });

    const form = document.querySelector('#search_input');
    form.addEventListener('submit', );

  