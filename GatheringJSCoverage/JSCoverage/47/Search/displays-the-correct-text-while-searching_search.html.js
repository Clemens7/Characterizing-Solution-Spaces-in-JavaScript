

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

          if(!query) 

          const q = serializeQuery(query);

          startSearch(query,q);

        });

        searchForm.addEventListener('submit', );

        function serializeQuery(query){

          let query_parts = query.split(' ');
          let q = '';

          for( let part of query_parts){
            q+= part + '+';
          }

          //get rid of last +
          q = q.substr(0,q.length-1);

          return q;
        }

        function startSearch(query, q){
          //searchInput.name = "=" + query;
          searchInfo.innerHTML = `Searching for “${query}”...`;
          console.log('This is the query q: ' + q );

          imageGallery.innerHTML = '';
          if(q != ''){
            console.log('calling search Images');
            searchImages(query,q);
          }

        }


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

        async function searchImages(query,q){

          let response = await fetch(metAPIURL + q);
          let data = await response.json();
          let artwork = 'artwork';

          if(data.total != 1){
            artwork += 's';
          }


          //console.log(data);

          let ids = data.objectIDs;

          if (!ids) 


          createPromises(ids,`Found ${data.total} ${artwork} for “${query}”`);


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
                  .then((results) => {
                    for(let i = 0; i < results.length && i < 100; i++ ){
                      displayImage(results[i]);
                    }
                  }).then(() => {
            searchInfo.innerHTML = searchString;
          });
        }

        function displayImage(picture){

          const div = document.createElement('div');
          div.className = 'thumb';
          const link = document.createElement('a');
          link.id = 'object-' + picture.objectID;
          link.href = './config.html?objectID=' + picture.objectID;

          div.appendChild(link);

          imageGallery.appendChild(div);

          const image = document.createElement('img');
          image.src = picture.primaryImageSmall;
          image.id = 'object-image-' + picture.objectID;
          image.alt = '';
          image.src = picture.primaryImageSmall;


          const museumLabel = document.createElement('div');
          museumLabel.className = 'museum-label';
          museumLabel.innerHTML = `<span class="artist">${picture.artistDisplayName}</span>
            <span class="title">${picture.title}</span>,
            <span class="date">${picture.objectDate}</span>`;


          link.appendChild(image);
          link.appendChild(museumLabel);
        }





    