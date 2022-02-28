
    import { Artwork } from './artwork.js';
    import * as ArtworkAPI from './artwork-api.js';

    const gallery = document.getElementById('gallery');
    const searchInfo = document.getElementById('search-info');
    const cartlink = document.getElementById('cart-link');
    var cartAmount = 0;
    
    try{
      cartAmount = JSON.parse(localStorage['cart']).length;
    }catch(e){};
    
    

    cartlink.innerText= 'Cart (' + cartAmount +')';
    document.addEventListener('DOMContentLoaded', event => {
      const params = (new URL(document.location)).searchParams;
      const searchQuery = params.get('q');
      if(!searchQuery) {
        getHighlights();
        return;
      }});

    const form = document.querySelector('.search-form');
    form.addEventListener('submit', );
    
    
  
    async function getHighlights(){
      const response = await fetch(window.location.protocol+'//'+window.location.host+'/highlights.json');
      const rawData = await response.json();
      let searchedArtworks = await rawData.highlights;
      gallery.innerHtml = '';
      let arts = []
      arts = await ArtworkAPI.retrieveImageData(searchedArtworks);
      await Promise.all(arts.map((artwork) => ArtworkAPI.createArtworkElement(artwork,gallery)));
    }
  