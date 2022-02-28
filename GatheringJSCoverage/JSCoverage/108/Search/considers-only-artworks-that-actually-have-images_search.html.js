
        import * as API from './metropolitan_api.js';
        import {ArtworkDocumentContainer} from "./search.js";
        import {Cart} from "./cart.js";

        

        /*
         * Retrieves artworks and inserts into gallery container
         */
        async function artworkSearch(query) {
            const searchInfo = document.getElementById("search-info");
            searchInfo.innerText = `Searching for “${query}”...`;
            const artworkContainer = new ArtworkDocumentContainer('gallery');
            artworkContainer.clear();
            const artworks = await API.get_objects_by_query(query);} for “${query}”`
            for (let artwork of artworks) }

        document.addEventListener('DOMContentLoaded', event => {
            const params = (new URL(document.location)).searchParams;
            const artworkQuery = params.get('q');
            if (!artworkQuery) 
            document.getElementById('search').value = artworkQuery;
            artworkSearch(artworkQuery);
        });

        const form = document.getElementsByClassName("search-form").item(0);
        form.addEventListener('submit', );

        // CART NUMBER OF ITEMS
        document.getElementById("cart-link").innerText = `Cart ${Cart.numberOfItems() > 0
            
            : ""}`;

    