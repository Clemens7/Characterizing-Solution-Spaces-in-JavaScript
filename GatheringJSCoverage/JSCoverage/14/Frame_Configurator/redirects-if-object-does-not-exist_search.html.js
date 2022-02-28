
    

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

        let product = await getObject(objectID);}));}



    if (window.location.href.indexOf("?q=") > -1)  else {
      (async () => {
        let highlights = await getHighlights();
        console.log(highlights);
        displayProducts(highlights.highlights);
      })();
    }

  