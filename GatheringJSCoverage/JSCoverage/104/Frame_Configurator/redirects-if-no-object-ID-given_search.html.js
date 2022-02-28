
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
      let artwork = await Common.retrieveArtworksById(highlight);}

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
    

    const displayArtwork = 

    

    


    

  