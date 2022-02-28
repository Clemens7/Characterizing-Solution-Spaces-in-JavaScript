
    

    

    async function searchArt(queryString) {
      //let inputText = document.getElementById("search").value;
      //let searchResults = await fetchSearchData(inputText);
      //let maxResults = searchResults.total;
      //if(searchResults.total > 100){
      //  maxResults = 100; 
      //}
      //usesSearchFunction = true;

      let searchText = 'Searching for “' + queryString.split('+').join(' ') + '”...';
      document.getElementById("search-info").innerText = searchText;

      let searchResults = await fetchSearchData(queryString);

      displayProducts(searchResults.objectIDs);

      let artworkText = searchResults.total == 1  : " artworks for “";
      searchText = "Found " + searchResults.total + artworkText + queryString.split('+').join(' ') + '”';
      document.getElementById("search-info").innerText = searchText;

    }

    async function fetchSearchData(searchParam) {
      let response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchParam}&hasImages=true`);
      let data = await response.json();
      return data;
    }

    let cartData = getCartData();
    updateNavigationText(cartData);

    var parseQueryString = function () {

      var str = window.location.search;
      var objURL = {};

      str.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function ($0, $1, $2, $3) {
          objURL[$1] = $3;
        }
      );

      return objURL;
    };

    async function displayProducts(objects) {
      let html = '';

      await Promise.all(objects.map(async (objectID, i) => {
        if (i >= 100) return;

        let product = await getObject(objectID);

        html += '<div class="thumb">';
        html += '<a href="config.html?objectID=' + product.objectID + '" id="object-' + i + '">';
        html += '<img src="' + product.primaryImageSmall + '" alt="' + product.title + '" id="object-image-' + i + '">';
        html += '<div class="museum-label">';
        html += '<span class="artist">' + product.artistDisplayName + '</span>';
        html += '<span class="title">' + product.title + '</span>, ';
        html += '<span class="date">' + product.objectDate + '</span>';
        html += '</div>';
        html += '</a>';
        html += '</div>';

        document.getElementById("gallery").innerHTML = html;

      }));
    }



    if (window.location.href.indexOf("?q=") > -1) {
      var params = parseQueryString();
      let queryString = params["q"];
      console.log(queryString);
      searchArt(queryString);
    }

  