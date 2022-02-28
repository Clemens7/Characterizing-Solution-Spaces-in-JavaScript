
    import * as CartCache from '/cart-cache.js';
    import * as ArtworkCache from '/artwork-cache.js';
    import * as SearchAPI from '/search-api.js';
    import * as Frame from '/frame.js';

    const cartCache = CartCache.retrieve();

    document.addEventListener('DOMContentLoaded', event => {

    //CartCache.store(39799, 'S', "shabby", 20, "indigo", 0);


    
    const cart = document.getElementById('cart-link');
    if(cartCache){
        cart.innerHTML = `Cart (${cartCache.length})`;

    }

    for(let i = 0; i < cartCache.length; i++)

  });


  



  
  