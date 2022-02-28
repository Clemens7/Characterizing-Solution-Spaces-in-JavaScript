
        import * as API from './metropolitan_api.js';
        import {ArtworkDocumentContainer} from "./search.js";
        import {Cart} from "./cart.js";

        async function displayHighlightArtworks() {
            const searchInfo = document.getElementById("search-info");
            searchInfo.innerText = `Search our collection of more than 400,000 artworks.`;
            let h = await fetch('./highlights.json')
                .then(response => response.json());
            const artworks = await API.get_objects_by_ids(h.highlights);}

        /*
         * Retrieves artworks and inserts into gallery container
         */
        

        document.addEventListener('DOMContentLoaded', event => {
            const params = (new URL(document.location)).searchParams;
            const artworkQuery = params.get('q');
            if (!artworkQuery) {
                displayHighlightArtworks();
                return;
            }});

        const form = document.getElementsByClassName("search-form").item(0);
        form.addEventListener('submit', );

        // CART NUMBER OF ITEMS
        document.getElementById("cart-link").innerText = `Cart ${Cart.numberOfItems() > 0
            
            : ""}`;

    