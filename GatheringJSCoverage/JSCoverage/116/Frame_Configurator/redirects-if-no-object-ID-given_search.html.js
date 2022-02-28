

        const highlights = [39799, 459055, 437853, 435809, 436535, 360018, 634108, 459080, 435882, 271890, 459054, 436105];
        const gallery = document.getElementById('gallery');
        const form = document.querySelector('.search-form');
        const searchText = document.getElementById('search-info');

        class Picture {
            
        }

        //document.addEventListener('load', event => {
        //    updateHeader();
        //});

        window.onload = ;

        document.addEventListener('DOMContentLoaded', event => {
            const params = (new URL(document.location)).searchParams;
            const Query = params.get('q');
            console.log("Query is:" + Query);
            if (!Query) {
                defaultSite(gallery);
                return;
            }});

        form.addEventListener('submit', );

        

        function defaultSite(gallery) {
            for (let pic of highlights) {
                console.log(pic);
                //const result = retrieveById(pic);
                const result = cachedRetrieveById(pic);
                result.then(function (res2) {
                    gallery.appendChild(createPictureNode(res2));
                });
            }
        }

        

        

        async function cachedRetrieveById(object) {
            const cache = localStorage.getItem(object);
            if (cache) 
            const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + object);
            const rawData = await response.json();
            console.log("caching uncached object: " + object);
            localStorage.setItem(object, JSON.stringify(rawData));
            return rawData;
        }

        

        

        

        

        function createPictureNode(picture) {
            var objectID = "object-" + picture.objectID;
            var imageID = "object-image-" + picture.objectID;
            var imageURL = "./config.html?objectID=" + picture.objectID;
            const div = document.createElement('div')
            div.innerHTML +=
                `<a href="${imageURL}" id="${objectID}">
          <img src="${picture.primaryImageSmall}" alt="${picture.title}" id="${imageID}">
          <div class="museum-label">
            <span class="artist">${picture.artistDisplayName}</span>
            <span class="title">${picture.title}</span>,
            <span class="date">${picture.objectDate}</span>
          </div>
        </a>`;
            return div;
        }

        

        

        //mocking functionality over recipePuppy
        

        //helper for recipePuppa
        

        

        

        
    