
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
      if (!result) 
      document.getElementById("search-info").innerText =
              `Found ${result.quantity} artwork${result.quantity > 1 ? "s" } for “${searchTerm}”`;
      createGallery(result.artworks);
    };

    const createArtwork = artwork => {
      const thumb = document.createElement("div");
      thumb.classList.add("thumb");
      thumb.onclick = 
      const anchor = document.createElement("a");
      anchor.href = `config.html?objectID=${artwork.objectID}`;
      thumb.appendChild(anchor);
      const img = document.createElement("img");
      img.src = artwork.imageLink;
      img.alt = artwork.alt;
      anchor.appendChild(img);
      const museumLabel = document.createElement("div");
      museumLabel.classList.add("museum-label");
      anchor.appendChild(museumLabel);
      const artist = document.createElement("span");
      artist.classList.add("artist");
      artist.innerText = artwork.artist;
      museumLabel.appendChild(artist);
      const title = document.createElement("span");
      title.classList.add("title");
      title.innerText = `${artwork.title}, `;
      museumLabel.appendChild(title);
      const date = document.createElement("span");
      date.classList.add("date");
      date.innerText = artwork.date;
      museumLabel.appendChild(date);
      return thumb;
    };

    const createGallery = artworks => {
      const gallery = document.getElementById("gallery");
      artworks.map(artwork => gallery.appendChild(createArtwork(artwork)));
    }
  