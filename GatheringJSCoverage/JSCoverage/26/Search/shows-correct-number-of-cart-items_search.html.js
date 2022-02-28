
    import { retrieveArtworkInformation } from "./artwork.js"
    import "./cart.js"

    //eventlisteners
    const form = document.getElementById('searchForm');
    form.addEventListener('submit', );
    document.addEventListener('DOMContentLoaded', event => searchViaURLQuery(event));

    

    function searchViaURLQuery() {
      const params = new URLSearchParams(location.search);
      if (!params.has('q')) {
        highlights();
        return;
      }}

    

    // get artowrk IDs from the metmuseum api [search endpoint]
    

    // creates the html artwork element
    function createArtworkElement(artwork) {
      const outerContainer = document.createElement('div');
      outerContainer.className = 'thumb';

      const link = document.createElement('a');
      link.id = `object-${artwork.id}`
      link.href = `config.html?objectID=${artwork.id}`;

      const img = document.createElement('img');
      img.id = `object-image-${artwork.id}`
      img.src = artwork.img;

      const innerContainer = document.createElement('div');
      innerContainer.className = 'museum-label';

      const spanArtist = document.createElement('span');
      spanArtist.className = 'artist';
      spanArtist.innerText = artwork.artist;

      const spanTitle = document.createElement('span');
      spanTitle.className = 'title';
      spanTitle.innerText = artwork.title;

      const spanDate = document.createElement('span');
      spanDate.className = 'date';
      spanDate.innerText = ", " + artwork.date;

      outerContainer.appendChild(link);
      link.appendChild(img);
      link.appendChild(innerContainer);
      innerContainer.appendChild(spanArtist);
      innerContainer.appendChild(spanTitle);
      innerContainer.appendChild(spanDate);

      document.getElementById('gallery').appendChild(outerContainer);
    }

    function highlights() {
      loadJSON(response => {
        var highlightsIDs = JSON.parse(response);
        const results = document.getElementById('gallery');
        results.innerHTML = '';
        for (let highlight of highlightsIDs.highlights) {
          retrieveArtworkInformation(highlight).then(artwork => {
            createArtworkElement(artwork);
          });
        }
      });
    }

    function loadJSON(callback) {
      var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
      xobj.open('GET', 'highlights.json', true);
      xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == '200') {
          callback(xobj.responseText);
        }
      };
      xobj.send(null);
    }

  