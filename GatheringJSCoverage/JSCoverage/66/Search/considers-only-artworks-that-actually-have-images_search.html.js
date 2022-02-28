

    import * as searchAPI from './search.js';

    async function artSearch(q) {

      let searchinfo = document.getElementById('search-info');

     searchinfo.innerText = "Searching for “" + q + "”...";

      const artworks = await searchAPI.retrieve(q);}


    document.addEventListener('DOMContentLoaded', event => { // reacts to url with search query in it

    // localStorage.clear();
      /////number of cartitems
     var items = getLocalStorage("cart");
      document.getElementById("cart-count").innerText = " (" + items.length + ")";

      const params = (new URL(document.location)).searchParams;
     // console.log(document.location);
     // console.log(params.get('q'));


      const stringQuery = params.get('q');
      if(!stringQuery) 

      document.getElementById('search').value = stringQuery;

      artSearch(stringQuery);
    });


    const searchInput = document.getElementById('search');
    searchInput.addEventListener('click', );

    const form = document.querySelector('.search-form');

    form.addEventListener('submit', );


  