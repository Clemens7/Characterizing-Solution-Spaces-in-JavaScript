

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
                    .then(response => {
                      return response.json()
                    })
                    .then(data => {
                      console.log(data)

                      const ids = data.highlights;
                      console.log(ids);
                      createPromises(ids);

                    })

            return;
          }});

        searchForm.addEventListener('submit', );

        

        


        async function fetchImageData(id){
          console.log('checking if picture is in local storage');
          let picture = JSON.parse(localStorage.getItem(id));

          console.log(picture);

          if(!picture) {
            console.log("resolving picture");
            let response = await fetch(objectAPI + id);
              picture = await response.json();

             console.log(picture);
            localStorage.setItem(id, JSON.stringify(picture));
          }

          return picture;
        }

        

        function createPromises(ids, searchString = standardSearchInfo){
          let promises = new Array();

          let i = 0;
          for(let id of ids){
            let p = new Promise((resolve,reject) => resolve(fetchImageData(id)));
            promises.push(p);
            i++;
            if (i == 100) 
          }


          console.log('resolving promises');

          Promise.all(promises)
                  .then().then();
        }

        





    