
        import {retrieveIDs, retrieveArtworks} from "./image-api.js";

        import * as cart from './cart.js';

        const updateHeader = ;

        

        document.addEventListener('DOMContentLoaded', event => {
            const search = new URLSearchParams(location.search).get('q')
            if (search )  else {
                retrieveHighlights();
            }

            cart.updateCartSize();
        });

        document.querySelector(".search-form").addEventListener('submit', );

        async function retrieveHighlights() {
            const response = await fetch('highlights.json');
            response.json().then(data => retrieveArtworks(data.highlights));
        }

        document.getElementById("search").addEventListener('keyup', )
    