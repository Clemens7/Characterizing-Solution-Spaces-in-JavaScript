

    import * as searchAPI from './search.js';

    async function artSearch(q) {

      let searchinfo = document.getElementById('search-info');

     searchinfo.innerText = "Searching for “" + q + "”...";

      const artworks = await searchAPI.retrieve(q);
      if(!artworks) 

      if(artworks.length == 1) 
     else  searchinfo.innerText = "Found " + artworks.length + " artworks for “" + q + "”";


      for (let i = 0; i < artworks.length; i++) {
        //add artwork html element
      searchAPI.display(artworks[i], i);
      }

       localStorage[q]= JSON.stringify(artworks);

    }


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


  