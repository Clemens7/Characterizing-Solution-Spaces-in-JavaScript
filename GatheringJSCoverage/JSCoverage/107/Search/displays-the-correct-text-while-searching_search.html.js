
   

   import { searchForSomeArt, displayhighlights } from './search-and-display.js';
   import { store, retrieveFromStorage } from './art-cache.js';
   import { countCartItems } from './display-cart-number.js';
    
    //localStorage.clear();
    document.addEventListener('DOMContentLoaded', event => {
  
      const params = (new URL(document.location)).searchParams;
      const searchQuery = params.get('q');
     
      if (!searchQuery) 
     
      let headerDoc = document.getElementById('search-info');
      headerDoc.innerText = `Searching for “${searchQuery}”...`;
      const searchQ = searchQuery.split(' ');
      searchForSomeArt(searchQ);
      countCartItems();
    });

    



    countCartItems();
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('click', );

    const form = document.querySelector('form');
    form.addEventListener('submit', );

    

  