
        import {GalleryDocumentContainer} from "./GalleryDocumentContainer.js";
        import * as GalleryAPI from "./searchAPI.js";
        import * as GalleryCache from "./artwork-cache.js"
        import {showNumItems} from "./common.js";

        document.getElementById('cart-link').innerHTML = 'Cart' + showNumItems();

        let searchForm = document.getElementById("search-form");
        searchForm.addEventListener("submit", );

        async function artworkSearch(searchTerm) {
            let searchInfo = document.getElementById("search-info");
            searchInfo.innerText = 'Searching for “' + searchTerm + '”...';
            let container = new GalleryDocumentContainer();
            container.clear();
            let number = 0;
            let artworkIDs;
            let artworks;
            const cache = [];
            if (!(artworks = GalleryCache.retrieve(searchTerm))) {
                artworkIDs = await GalleryAPI.getArtworks(searchTerm);; i++) }

        

        document.addEventListener('DOMContentLoaded', event => {
            const params = (new URL(document.location)).searchParams;
            const searchTerm = params.get('q');
            if (!searchTerm || searchTerm === "") 
            if (!document.getElementById('search').value) {
                document.getElementById('search').value = searchTerm;
            }

            artworkSearch(searchTerm);
        })
    