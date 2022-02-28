
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
            if(cart) {
                if(cart.length > 0) 
            }
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
                    ids => {
                        console.log(ids.highlights);
                        ids.highlights.forEach(
                            e => retrieveById(e).then(
                                result => gallery.appendChild(buildArtworkEntity(result))
                            ));
                    }));
        }

        /**
         * Get an artwork by id from the the API of the Metropolitan Museum
         **/
        async function retrieveById(id) {
            let artworkStored = retrieveFromLocalStorage(id);
            if (artworkStored) {
                console.log(`Retrieve artwork with id ${id} from local storage`);
                return artworkStored;
            }}

        function retrieveFromLocalStorage(id) {
            if (id in localStorage) {
                return JSON.parse(localStorage[id]);
            }
        }

        

        function getCart() {
            console.log('Load artworks in card');
            return JSON.parse(localStorage.getItem('cart'));
        }


        /**
         * An artwork entity is realised through a div-container ('outer container')
         * This div container contains an a-Tag, which contains
         * an img and an div ('inner container')
         * */
        function buildArtworkEntity(artwork) {
            //outer container
            const outerContainer = document.createElement('div');
            outerContainer.className = "thumb";

            //a Tag
            const aTag = document.createElement('a');
            aTag.id = artwork.id;
            aTag.href = `./config.html?objectID=${artwork.id}`;

            // image
            const image = document.createElement('img');
            image.src = artwork.image;
            image.id = 'object-image-' + artwork.id;

            //inner Container
            const innerContainer = document.createElement('div');
            innerContainer.className = 'museum-label';
            innerContainer.appendChild(buildElement('span', artwork.artist, 'artist'));
            innerContainer.appendChild(buildElement('span', artwork.title + ", ", 'title'));
            innerContainer.appendChild(buildElement('span', artwork.date, 'date'));


            aTag.appendChild(image);
            aTag.appendChild(innerContainer);

            outerContainer.appendChild(aTag);

            return outerContainer;
        }

        function buildElement(tag, value, tagClass = "") {
            const element = document.createElement(tag);
            element.innerText = value;
            element.className = tagClass;
            return element;
        }


    