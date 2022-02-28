
    import { retrieveArtworkInformation } from "./artwork.js"
    import "./cart.js"

    //eventlisteners
    const form = document.getElementById('searchForm');
    form.addEventListener('submit', );
    document.addEventListener('DOMContentLoaded', event => searchViaURLQuery(event));

    

    function searchViaURLQuery() {
      const params = new URLSearchParams(location.search);
      if (!params.has('q')) 
      const query = params.get('q');

      artworkSearch(query);
    }

    function artworkSearch(searchTerm) {
      document.getElementById('search-info').innerText = `Searching for “${searchTerm}”...`;

      const results = document.getElementById('gallery');
      results.innerHTML = '';

      const artworks = retrieveArtworkIDs(searchTerm.split(','));

    }

    // get artowrk IDs from the metmuseum api [search endpoint]
    function retrieveArtworkIDs(searchTerm) {
      function serializeSearchTermForQuery(searchTerm) {
        return searchTerm.join('%20');
      }

      fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${serializeSearchTermForQuery(searchTerm)}`)
        .then(result => {
          return result.json()
        })
        .then(rawData => {
          document.getElementById('search-info').innerText = `Found ${rawData.total} artwork${rawData.total == 1  : "s"} for “${searchTerm}”`

          if (rawData.total > 0) {
            const artworkIDs = rawData.objectIDs.splice(0, 100); // only the first 100 entries
            for (let id of artworkIDs) {
              retrieveArtworkInformation(id).then(artwork => {
                createArtworkElement(artwork);
              });
            }
          }
        });

    }

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

    

    

  