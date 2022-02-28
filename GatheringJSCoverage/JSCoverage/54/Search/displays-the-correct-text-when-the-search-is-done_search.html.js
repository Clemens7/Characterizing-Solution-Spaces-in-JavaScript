
    import * as Common from './common.js';

    Common.setCartItemNumber();
    document.getElementById('search-button').addEventListener("click", searchClick);

    var q = getParameterByName('q');
    if (q !== null && q !== "" && q !== undefined) {
      search(q);
    }

    

    function search(query) {

      let searchInfo = document.getElementById("search-info");
      searchInfo.textContent = `Searching for “${query}”...`;

      fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&hasImages=true&q=${query}`)
        .then((response) => response.json())
        .then((data) => {

          if (data.total == 1)  else {
            searchInfo.textContent = `Found ${data.total} artworks for “${query}”`;
          }

          if (data.total > 0) 

          getCars(data.objectIDs, length)

        })
        .catch();
    }

    

    function getCars(idList, length) {
      for (let i = 0; i < length; ++i) }

    

    function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
      if (!results) 
      if (!results[2]) 
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

  