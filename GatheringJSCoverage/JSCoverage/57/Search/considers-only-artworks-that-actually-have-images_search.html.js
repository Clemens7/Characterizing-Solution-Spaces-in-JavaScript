
    import { searchArt, getArtById } from './apiCalls.js'
    import { render, getPrintSizes, calculatePrice } from './frame.js'
    import { store, retrieve } from './metCache.js'

    const hLights = [39799, 459055, 437853, 435809, 436535, 360018, 634108, 459080, 435882, 271890, 459054, 436105];

    const urlParams = new URLSearchParams(window.location.search);
    let searchTerm = urlParams.get('q');
    const maxVisibleResults = 100;
    let searchResults = {};

    const updateResults = 

    const startSearch = async searchTerm => {
      searchResults = await searchArt(searchTerm)}

    document.addEventListener('DOMContentLoaded', async e => {
      const cart = JSON.parse(window.localStorage.getItem('cart'));
      if (cart ) 

      if (!searchTerm)  else {
        document.getElementById('search-info').innerHTML = `Searching for “${searchTerm}”...`
      }

      document.getElementById('search').value = searchTerm;
      startSearch(searchTerm);
    })
    
  