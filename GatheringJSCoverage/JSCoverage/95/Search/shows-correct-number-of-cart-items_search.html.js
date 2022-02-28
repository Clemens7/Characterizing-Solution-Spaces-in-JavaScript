
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
                              .then(object => {
                                  display(object);
                              });
                      }
                  });
              return;
          }});

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

      

      

  