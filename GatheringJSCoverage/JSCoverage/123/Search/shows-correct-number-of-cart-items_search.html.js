


    //get the query parameter q
    document.addEventListener("DOMContentLoaded", event => {
      //get current artworks from cart
    var temp = window.localStorage.getItem("cart");
    if(temp) {
      var cartItems = JSON.parse(temp).length;
      document.getElementById("cart-link").innerHTML = "Cart" + " (" + cartItems + ")";
    }

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
      let objectResponse = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + currentObjectID);
      var object = await objectResponse.json();
      let img = object.primaryImageSmall;

      let html = '<div class="thumb"><a href="config.html?objectID='+currentObjectID+'" id='+currentObjectID+'><img src='+img+' alt='+object.title+' id='+currentObjectID+'><div class="museum-label"><span class="artist">'+object.artistDisplayName+'</span><span class="title">'+object.title+'</span>,<span class="date">'+object.objectDate+'</span></div></a></div>';

      gallery.insertAdjacentHTML("afterbegin", html);
    }

  }

  
  