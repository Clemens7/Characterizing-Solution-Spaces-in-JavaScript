
        import {retrieveIDs, retrieveArtworks} from "./image-api.js";

        import * as cart from './cart.js';

        const updateHeader = (text) => document.getElementById("search-info").innerText = text;

        function searchImages(search) {
            document.getElementById("search").value = search;
            updateHeader(`Searching for “${search}”...`)
            retrieveIDs(search).then(objectIDs => {
                const size = objectIDs.length;
                updateHeader(`Found ${size} ${size === 1  : "artworks"} for “${search}”`);
                retrieveArtworks(objectIDs);
            })
        }

        document.addEventListener('DOMContentLoaded', event => {
            const search = new URLSearchParams(location.search).get('q')
            if (search && search !== '') {
                searchImages(search);
            }

            cart.updateCartSize();
        });

        document.querySelector(".search-form").addEventListener('submit', );

        

        document.getElementById("search").addEventListener('keyup', )
    