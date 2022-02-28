
    import * as ArtworkAPI from "./artwork-api.js";
    import * as ArtworkCache from "./artwork-cache.js"
    import * as Cart from "./cart-cache.js"

    document.addEventListener("DOMContentLoaded", async event => {
      const cart = Cart.retrieveCart();
      if (cart) 
      const params = (new URL(document.location)).searchParams;
      const artworksQuery = params.get("q");
      const randomKey = "lsrdkgjnf3498jrmfrsRFmdfk40e9rjf"

      if (!artworksQuery) {
        const cachedArtworks = ArtworkCache.retrieve(randomKey);
        if (cachedArtworks) 
        const objectIDs = await fetch("highlights.json");
        const jsonObjectIDs = await objectIDs.json();
        const artworkHighlights = await Promise.all(ArtworkAPI.retrieveFromObjectIDs(jsonObjectIDs.highlights))});

    const searchArtworks = ;

    const createArtwork = ;

    const createGallery = 
  