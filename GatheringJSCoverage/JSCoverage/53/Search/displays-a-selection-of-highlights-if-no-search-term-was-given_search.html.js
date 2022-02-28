

        import {ArtmartDocumentContainer} from './artmart-dom.js';
        import * as MetmuseumAPI from './metmuseum-api.js';
        import {ShoppingCartDOM} from './shopping-cart-dom.js';
        import * as ShoppingCartStorage from './shopping-cart-storage.js';

        const defaultBorderLayout = 'none'; // no border is default
        const notValidBorderLayout = '1px solid red'; // invalid input validation style
        const resultSize = 100; // max items in search result page

        document.addEventListener('DOMContentLoaded', event => {
            registerFormSubmitEventListener();
            applyUrlQueryParam();
            updateCartLink();
        })

        function applyUrlQueryParam() {
            const urlParams = new URLSearchParams(window.location.search);
            const searchQuery = urlParams.get('q');

            /* Query term info */
            const searchInfo = document.getElementById('search-info');
            if (searchQuery === null ) {
                searchInfo.innerText = "Search our collection of more than 400,000 artworks."
            }
            artmartSearch(searchQuery)
        }

        function registerFormSubmitEventListener() {
            const form = document.getElementById('searchForm');

            /* Register event handler on search form submit */
            form.addEventListener('submit', );
        }

        /* search */
        function artmartSearch(searchterm) {
            /* search by term or show defaults (highlights) */
            if (searchterm)  else {
                getAndSetHighlights();
            }
        }

        /* retrieve all objects by searched-ids and add to DOM */
        

        /* retrieve all objects by preset ids (highlights) and add to DOM */
        async function getAndSetHighlights() {
            var highlights = await loadHighlights()
            const artmartResultDomCreator = new ArtmartDocumentContainer("gallery");
            artmartResultDomCreator.clear();
            for (let objectId of highlights) {
                retrieveAndAddObject(objectId, artmartResultDomCreator);
            }
        }

        /* retrieve object from met api asynchronosly and add it to the gallery if promise resolved using the creator */
        async function retrieveAndAddObject(objectId, artmartResultDomCreator) {
            let result = await MetmuseumAPI.retrieveObject(objectId);
            // ToDo store in cache
            artmartResultDomCreator.addSearchResultToDom(result);
        }


        /* load highlight-ids from json file */
        async function loadHighlights() {
            const highlights = await fetch("highlights.json")
                .then((res) => res.json())
                .then((data) => data.highlights)
                .catch()
            return highlights
        }

        /* updates header with cart item amount */
        function updateCartLink() {
            const items = ShoppingCartStorage.retrieve();
            const shoppingCart = new ShoppingCartDOM(items);
            shoppingCart.updateCartLink();
        }

    