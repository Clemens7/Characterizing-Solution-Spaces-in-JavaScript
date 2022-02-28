
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
                  for (let objectId of objects) {
                      ArtAPI.retrieveObject(objectId)
                          .then(object => {
                              display(object);
                          });
                  }
              });
      });

      function display(object) {
          const gallery = document.getElementById('gallery');
          gallery.innerHTML += `
                      <div class="thumb">
                          <a href="config.html?objectID=${object.objectID}" id="object-0">
                          <img src="${object.primaryImageSmall.toString()}" alt="" id="object-image-0">
                          <div class="museum-label">
                          <span class="artist">${object.artistDisplayName.toString()}</span>
                          <span class="title">${object.title.toString()}</span>,
                          <span class="date">${object.objectDate.toString()}</span>
                          </div>
                          </a>
                          </div>`;
      }

      function counter(data) {
          if (!data) 
          return data.length;
      }

      function plural(num) {
          if (num !== 1) return 's';
      }

  