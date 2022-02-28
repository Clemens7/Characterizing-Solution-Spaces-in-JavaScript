


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
    if(window.localStorage.getItem(searchQuery) != null)  else {
       //get the results and convert to json
      response = await fetch(link)
      artworks = await response.json();}
  