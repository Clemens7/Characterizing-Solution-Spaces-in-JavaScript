
      import * as ArtAPI from './art-api.js';
      import * as Cart from './cart.js';

      Cart.updateCartString();

      document.addEventListener('DOMContentLoaded', event => {
          const params = (new URL(document.location)).searchParams;
          const objectQuery = params.get('q');
          if (!objectQuery) {
              fetch('./highlights.json')
                  .then(response => response.json())
                  .then(objects => {
                      for (let objectId of objects.highlights) {
                          ArtAPI.retrieveObject(objectId)
                              .then();
                      }
                  });
              return;
          }});

      

      

      

  