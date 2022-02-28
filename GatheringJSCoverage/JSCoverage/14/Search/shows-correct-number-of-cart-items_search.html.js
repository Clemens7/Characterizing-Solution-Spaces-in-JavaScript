
    

    async function getHighlights() {
      let result = await fetch("highlights.json");
      return result.json();
    }

    

    

    let cartData = getCartData();
    updateNavigationText(cartData);

    var parseQueryString = ;

    async function displayProducts(objects) {
      let html = '';

      await Promise.all(objects.map(async (objectID, i) => {
        if (i >= 100) 

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



    if (window.location.href.indexOf("?q=") > -1)  else {
      (async () => {
        let highlights = await getHighlights();
        console.log(highlights);
        displayProducts(highlights.highlights);
      })();
    }

  