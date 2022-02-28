

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
                result.then();
            }
        }

        

        

        async function cachedRetrieveById(object) {
            const cache = localStorage.getItem(object);
            if (cache) 
            const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + object);
            const rawData = await response.json();}

        

        

        

        

        

        

        

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

        
    