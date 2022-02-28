

        const searchForm = document.getElementById('search-form');
        const searchButton = document.getElementById('search-button');
        const searchInput = document.getElementById('search');
        const searchInfo = document.getElementById('search-info');
        const standardSearchInfo = 'Search our collection of more than 400,000 artworks.';
        const metAPIURL = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=';
        const objectAPI = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
        const imageGallery = document.getElementById('gallery');
        const cartLink = document.getElementById("cart-link");

        document.addEventListener('DOMContentLoaded', event => {
            const cart = localStorage.getItem('cart');
            if(!cart){
                cartLink.innerText = "Cart";
            }


          searchInput.value = '';

          const params = (new URL(document.location)).searchParams;
          const query = params.get('q');
          console.log(query);

          if(!query) {
            console.log('loading highlights');

           fetch('./highlights.json')
                    .then()
                    .then()

            return;
          }});

        searchForm.addEventListener('submit', );

        

        


        

        

        

        





    