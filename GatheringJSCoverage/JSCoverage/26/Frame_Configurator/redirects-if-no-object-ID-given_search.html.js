
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
    

    function highlights() {
      loadJSON(response => {
        var highlightsIDs = JSON.parse(response);
        const results = document.getElementById('gallery');
        results.innerHTML = '';
        for (let highlight of highlightsIDs.highlights) {
          retrieveArtworkInformation(highlight).then();
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

  