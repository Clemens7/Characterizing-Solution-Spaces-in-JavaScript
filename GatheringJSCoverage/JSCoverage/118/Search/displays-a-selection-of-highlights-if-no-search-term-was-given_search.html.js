
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

        highlights_json = await fetchObjectsFromAPI(highlights);
        ACache.store('', highlights_json);
      }


    }



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
                .then(result => {
                  var artwork = parseToArtwork(result);
                  renderElement(artwork);
                  return result;
                }));
      }

      return Promise.all(promises)
              .then(results => {
                artworks_json = results;
                return artworks_json;
              })
    }




    function parseToArtwork(artwork_json) {
      return new Artwork(artwork_json.objectID, artwork_json.title, artwork_json.artistDisplayName, artwork_json.primaryImageSmall, artwork_json.objectDate);
    }




    function renderElement(artwork) {
      const outerContainer = document.createElement('div');
      outerContainer.className = `thumb`;

      const link = document.createElement('a');
      link.href = `config.html?objectID=${artwork.objectID}`;
      link.id = `object-${artwork.objectID}`;

      const img = document.createElement('img');
      img.src = `${artwork.imageURL}`;
      img.alt = ``;
      img.id = `object-image-${artwork.objectID}`;

      const innerContainer = document.createElement('div');
      innerContainer.className = `museum-label`;

      const artist = document.createElement('span');
      artist.className = `artist`;
      artist.innerText = `${artwork.artist}`;

      const title = document.createElement('span');
      title.className = `title`;
      title.innerText = `${artwork.title}, `;

      const date = document.createElement('span');
      date.className = `date`;
      date.innerText = `${artwork.date}`;

      gallery.appendChild(outerContainer);
      outerContainer.appendChild(link);
      link.appendChild(img);
      link.appendChild(innerContainer);
      innerContainer.appendChild(artist);
      innerContainer.appendChild(title);
      innerContainer.appendChild(date);
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

  