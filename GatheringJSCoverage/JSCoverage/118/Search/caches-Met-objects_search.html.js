
    import { Artwork } from './artwork.js';
    import * as ACache from './artwork-cache.js';
    import { updateCartItemsNumber } from "./cart-numbers.js";

    updateCartItemsNumber();

    const gallery = document.getElementById('gallery');

    const loadHighlights = 



    const search = async query => {
      const text = document.getElementById('search-info');
      text.innerText = `Searching for “${query}”...`;

      gallery.innerHTML = '';

      var artworks_json = ACache.retrieve(query);

      if (!artworks_json)  else {
        text.innerText = artworks_json.length === 1  : `Found ${artworks_json.length} artworks for “${query}”`;
        var artworks = [];
        console.log(artworks_json);

        artworks = artworks_json.map(artwork_json => parseToArtwork(artwork_json));
        artworks.map(artwork => renderElement(artwork));
      }

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

      if (q === null || q === '')  else {
        search(q);
      }
    });

    const form = document.querySelector('#search_input');
    form.addEventListener('submit', );

  