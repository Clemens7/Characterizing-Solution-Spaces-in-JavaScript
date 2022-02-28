


    //get the query parameter q
    document.addEventListener("DOMContentLoaded", event => {
      //get current artworks from cart
    var temp = window.localStorage.getItem("cart");
    if(temp) 

    const params = (new URL(document.location)).searchParams;
    //console.log(params);
    const searchQuery = params.get("q");
    //no search term, so we show highlights
    if(!searchQuery) {
      highlights();
    }

  });

  async function highlights() {


    let highlightsFile = await fetch("./highlights.json");
    var highlightsJSON = await highlightsFile.json();

    for(let i = 0; i < highlightsJSON.highlights.length; i++) {
      let currentObjectID = highlightsJSON.highlights[i];
      let objectResponse = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + currentObjectID);}

  
  