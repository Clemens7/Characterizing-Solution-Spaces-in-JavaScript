
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
              .then(objects => {
                  heading.innerText = `Found ${counter(objects)} artwork${plural(counter(objects))} for “${objectQuery}”`;
                  for (let objectId of objects) });
      });

      

      function counter(data) {
          if (!data) return 0;}

      function plural(num) {
          if (num !== 1) return 's';
      }

  