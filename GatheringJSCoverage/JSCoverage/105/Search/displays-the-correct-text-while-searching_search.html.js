
        class Artwork {
            constructor(id, artist, title, date, image) {
                this.id = id;
                this.artist = artist;
                this.title = title;
                this.date = date;
                this.image = image;
            }
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
                if (rawData.objectIDs == null) 
                const arr = rawData.objectIDs;
                let limit = arr.length;
                if (limit > 100) 
                for (let index = 0; index < limit; index++) {
                    retrieveById(arr[index]).then(
                        result => {
                            gallery.appendChild(buildArtworkEntity(result));
                            console.log(gallery.childElementCount);

                        }
                    );
                }
                let word = 'artworks';
                if (arr.length === 1) 
                heading.innerText = `Found ${arr.length} ${word} for “${q}”`;
            } 
        }

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
        async function retrieveById(id) {
            let artworkStored = retrieveFromLocalStorage(id);
            if (artworkStored) 
            console.log(`Retrieve artwork with id ${id} from metropolitan museum API`);
            const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
            try {
                const response = await fetch(url);
                const rawData = await response.json();
                console.log(rawData);
                const artwork = new Artwork(rawData.objectID, rawData.artistDisplayName, rawData.title, rawData.objectDate, rawData.primaryImageSmall);
                store(artwork);
                return artwork;

            }}

        function retrieveFromLocalStorage(id) {
            if (id in localStorage) 
        }

        function store(artwork) {
            console.log(artwork.id);
            localStorage[artwork.id] = JSON.stringify(artwork);
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


    