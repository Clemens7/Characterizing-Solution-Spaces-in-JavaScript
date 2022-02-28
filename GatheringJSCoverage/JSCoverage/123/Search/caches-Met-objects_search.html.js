


    //get the query parameter q
    document.addEventListener("DOMContentLoaded", event => {
      //get current artworks from cart
    var temp = window.localStorage.getItem("cart");
    if(temp) 

    const params = (new URL(document.location)).searchParams;
    //console.log(params);
    const searchQuery = params.get("q");
    //no search term, so we show highlights
    if(!searchQuery)  else {
      qSearch(searchQuery);
    }

  });

  

  async function qSearch(searchQuery) {
    //create the request link with our searchQuery
    //we only accept artworks with images
    let link = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q="
    link = link + searchQuery;

    //show searching Text
    document.getElementById("search-info").textContent = 'Searching for ' + '“' + searchQuery + '”' +"...";

    //Check if cache has already saved
    let response = null;
    let artworks = null;
    if(window.localStorage.getItem(searchQuery) != null) {
      //load it from localStorage
      artworks = window.localStorage.getItem(searchQuery);
    }

    var total = artworks.total;
    //change text according to number of total
    if(total == 0)  else if (total == 1)  else {
        document.getElementById("search-info").textContent = "Found " + total + " artworks for " + '“' + searchQuery + '”';
      }

      //console.log(artworks);

      var gallery = document.getElementById("gallery");

      //we only display the first 100 results
      let max = total;
      if (total > 100) ;

      //draw Artworks
      for(let i = 0; i < max; i++) 
  }
  