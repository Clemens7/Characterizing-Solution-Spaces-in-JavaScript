

        const highlights = [39799, 459055, 437853, 435809, 436535, 360018, 634108, 459080, 435882, 271890, 459054, 436105];
        const gallery = document.getElementById('gallery');
        const form = document.querySelector('.search-form');
        const searchText = document.getElementById('search-info');

        class Picture {
            
        }

        //document.addEventListener('load', event => {
        //    updateHeader();
        //});

        window.onload = () => { updateHeader(); };

        document.addEventListener('DOMContentLoaded', event => {
            const params = (new URL(document.location)).searchParams;
            const Query = params.get('q');
            console.log("Query is:" + Query);
            if (!Query) 
            searchText.innerText = "Searching for “" + Query + "”...";
            console.log("working from params");
            const result = foundationSearch(Query);
            //buildSite(result);
            result.then(function (res2) {
                console.log(res2);
                console.log(res2.objectIDs)
                buildSite(res2, Query);
            });
            //simpleBuildSite("test");
        });

        form.addEventListener('submit', );

        function foundationSearch(term) {
            console.log(term);
            const result = pictureSearch(term);
            result.then(function (res2) {
                console.log(res2);
            });
            return result;
        }

        

        

        

        

        function buildSite(elements, term) {
            console.log(elements);
            var count = 100;
            if (elements.total < 100) {
                count = elements.total;
            }
            console.log("Count is: " + count);
            if (count == 1)  else {
                searchText.innerText = "Found " + count + " artworks for “" + term + "”";
            }
            for (var i = 0; i < count; i++) 
            //gallery.appendChild(createPictureNode(elements));
            //updateHeader();
        }

        

        async function pictureSearch(searchTerm) {
            console.log("picturesearch in progress. term: " + searchTerm);
            //const pictures = await retrievePicture(searchTerm);
            const results = await getIdByTerm(searchTerm);
            return results;
        }

        async function getIdByTerm(term) {
            const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=' + term);
            const rawData = await response.json();
            return rawData;
        }

        

        

        

        //mocking functionality over recipePuppy
        

        //helper for recipePuppa
        

        

        function updateHeader() {
            //const cart = localStorage.getItem('cart');
            let cartsize = JSON.parse(localStorage.getItem('cart')).length;
            //console.log("Cart is: " + cart);
            //console.log("Cartlength is:" + cart.length)
            //console.log("Cartsize is:" + cartsize)
            if (cartsize) 
        }

        
    