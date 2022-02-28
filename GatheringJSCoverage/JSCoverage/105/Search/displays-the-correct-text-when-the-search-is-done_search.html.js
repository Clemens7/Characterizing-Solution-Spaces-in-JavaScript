
        class Artwork {
            
        }

        const gallery = document.getElementById('gallery');
        const heading = document.getElementById('search-info');
        if (searchValue()) {
            console.log('header gets resetted');
            heading.innerText = '';
        }


        /**
         * Several event listeners
         **/
        document.addEventListener('DOMContentLoaded', event => {
            console.log('Dom content fully loaded');
            const q = searchValue();
            gallery.innerHTML = '';
            let cart = getCart();
            if(cart) 
            if (!q)  else {
                const heading = document.getElementById('search-info');
                heading.innerText = `Searching for “${q}”...`;
            }
            console.log(q);
            searchByParam(q);
        });

        const form = document.getElementById('search-form');
        form.addEventListener('submit', );

        async function searchByParam(q) {
            gallery.innerHTML = '';
            const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${q}`;
            try {
                const response = await fetch(url);
                const rawData = await response.json();
                console.log(rawData);
                const heading = document.getElementById('search-info');
                if (rawData.objectIDs == null) {
                    heading.innerText = `Found 0 artworks for “${q}”`;
                    return;
                }}

        function searchValue() {
            const params = (new URL(document.location)).searchParams;
            console.log('q' + params.get('q'));
            return params.get('q');
        }


        /**
         * Set up the website by either retrieving values from local storage
         * or loading it from the API
         **/
        

        /**
         * Get an artwork by id from the the API of the Metropolitan Museum
         **/
        

        

        

        function getCart() {
            console.log('Load artworks in card');
            return JSON.parse(localStorage.getItem('cart'));
        }


        /**
         * An artwork entity is realised through a div-container ('outer container')
         * This div container contains an a-Tag, which contains
         * an img and an div ('inner container')
         * */
        

        


    