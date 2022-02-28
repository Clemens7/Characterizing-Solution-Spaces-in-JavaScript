
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

      if (!highlights_json)  else {
        var artworks = [];

        artworks = highlights_json.map(artwork_json => parseToArtwork(artwork_json));
        artworks.map(artwork => renderElement(artwork));
      }


    }



    const search = 




    




    




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

  