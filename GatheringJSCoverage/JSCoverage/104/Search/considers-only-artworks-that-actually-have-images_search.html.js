
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
      const numberOfArtworks = await retrieveArtworksByTerm(searchTerm);}

    const displayArtwork = 

    async function retrieveArtworksByTerm(searchTerm) {
      const response = await fetch(`${MET_BASE_URL}search?hasImages=true&q=${searchTerm}`);}

    


    

  