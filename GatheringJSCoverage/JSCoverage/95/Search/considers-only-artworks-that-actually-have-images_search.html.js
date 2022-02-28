
      import * as ArtAPI from './art-api.js';
      import * as Cart from './cart.js';

      Cart.updateCartString();

      document.addEventListener('DOMContentLoaded', event => {
          const params = (new URL(document.location)).searchParams;
          const objectQuery = params.get('q');
          if (!objectQuery) 
          document.getElementById('search').value = objectQuery;
          const heading = document.getElementById('search-info');
          heading.innerText = `Searching for “${objectQuery}”...`;
          ArtAPI.retrieveObjectIDs(objectQuery)
              .then();
      });

      

      

      

  