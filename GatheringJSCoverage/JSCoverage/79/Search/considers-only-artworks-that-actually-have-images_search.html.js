
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
      if(!searchQuery) 
      document.getElementById('search').value = searchQuery;
      artSearch(searchQuery);
    });

    const form = document.querySelector('.search-form');
    form.addEventListener('submit', );
    
    async function artSearch(searchTerm){
      gallery.innerHtml = '';
      searchInfo.innerText = 'Searching for “' + searchTerm + '”...';
      let arts = [];
      arts = await ArtworkAPI.retrieve(searchTerm);}
  
    
  