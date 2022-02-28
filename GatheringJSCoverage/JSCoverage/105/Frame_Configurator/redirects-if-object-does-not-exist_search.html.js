
        class Artwork {
            
        }

        const gallery = document.getElementById('gallery');
        const heading = document.getElementById('search-info');
        if (searchValue()) 


        /**
         * Several event listeners
         **/
        document.addEventListener('DOMContentLoaded', event => {
            console.log('Dom content fully loaded');
            const q = searchValue();
            gallery.innerHTML = '';
            let cart = getCart();
            if(cart) 
            if (!q) {
                initializeWindow(gallery);
                return;
            }});

        const form = document.getElementById('search-form');
        form.addEventListener('submit', );

        

        function searchValue() {
            const params = (new URL(document.location)).searchParams;
            console.log('q' + params.get('q'));
            return params.get('q');
        }


        /**
         * Set up the website by either retrieving values from local storage
         * or loading it from the API
         **/
        async function initializeWindow() {
            gallery.innerHTML = '';
            fetch('highlights.json').then(
                response => response.json().then(
                    ));
        }

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
        

        


    