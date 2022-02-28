
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

          if (rawData.total > 0) 
        });

    }

    // creates the html artwork element
    

    

    

  