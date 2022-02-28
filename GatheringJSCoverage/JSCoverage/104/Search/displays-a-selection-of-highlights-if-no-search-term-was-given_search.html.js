
    import * as Cache from './cache.js'
    import * as Common from './common.js'

    const MET_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/';
    //const MET_BASE_URL = 'http://localhost:4445/';
    //Query parameter set via URL
    document.addEventListener('DOMContentLoaded', event => {
      event.preventDefault();
      document.getElementById('cart-link').innerText = `Cart (${Common.getNumberOfObjectsInCart()})`;
      const params = (new URL(document.location)).searchParams;
      const query = params.get('q');
      if (!query) {
        loadHighlights();
        return;
      }});


    function loadHighlights() {
      var jsonresponse =
        loadJSON(async function (response) {
          jsonresponse = JSON.parse(response);
          const gallery = document.getElementById('gallery');
          gallery.innerHTML = '';

          for (let highlight of jsonresponse.highlights) {
            fetchAndDisplayHighlight(highlight);
          }
        });
    }

    async function fetchAndDisplayHighlight(highlight) {
      let artwork = await Common.retrieveArtworksById(highlight);
      displayArtwork(artwork);
    }

    function loadJSON(callback) {

      var xobj = new XMLHttpRequest();
      const url = 'highlights.json';
      xobj.overrideMimeType("application/json");
      xobj.open('GET', url);
      xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          callback(xobj.responseText);
        }
      }
      xobj.send(null);

    }

    //Updates page and queries met Api
    

    const displayArtwork = artwork => {
      return new Promise((resolve, reject) => {
        return setTimeout(() => resolve(gallery.innerHTML += createArtworkElement(artwork, artwork.objectID)), 200)
      })
    }

    

    


    function createArtworkElement(artwork, objectID) {
      const artworkHtml =
        `<div class="thumb">
          <a href="./config.html?objectID=${objectID}" id="object-${objectID}">
            <img src="${artwork.primaryImageSmall}" alt="${artwork.title}" id="object-image-${objectID}">
              <div class="museum-label">
                <span class="artist">${artwork.artistDisplayName}</span>
                <span class="title">${artwork.title}</span>,
                <span class="date">${artwork.objectDate}</span>
              </div>
          </a>
        </div>`;
      return artworkHtml;

    }

  