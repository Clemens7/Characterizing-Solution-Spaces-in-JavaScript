
    import * as ArtworkAPI from "./artwork-api.js";
    import * as ArtworkCache from "./artwork-cache.js"
    import * as Cart from "./cart-cache.js"

    document.addEventListener("DOMContentLoaded", async event => {
      const cart = Cart.retrieveCart();
      if (cart) 
      const params = (new URL(document.location)).searchParams;
      const artworksQuery = params.get("q");
      const randomKey = "lsrdkgjnf3498jrmfrsRFmdfk40e9rjf"

      if (!artworksQuery) 
      document.getElementById("search-info").innerText = `Searching for “${artworksQuery}”...`;
      await searchArtworks(artworksQuery);
    });

    const searchArtworks = async searchTerm => {
      const result = await ArtworkAPI.retrieve(searchTerm);
      if (!result) {
        document.getElementById("search-info").innerText = `Found 0 artworks for “${searchTerm}”`;
        return;
      }} for “${searchTerm}”`;
      createGallery(result.artworks);
    };

    const createArtwork = ;

    const createGallery = 
  