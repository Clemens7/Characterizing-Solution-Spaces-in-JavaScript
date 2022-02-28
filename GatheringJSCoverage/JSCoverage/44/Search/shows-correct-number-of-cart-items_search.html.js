
        import {GalleryDocumentContainer} from "./GalleryDocumentContainer.js";
        import * as GalleryAPI from "./searchAPI.js";
        import * as GalleryCache from "./artwork-cache.js"
        import {showNumItems} from "./common.js";

        document.getElementById('cart-link').innerHTML = 'Cart' + showNumItems();

        let searchForm = document.getElementById("search-form");
        searchForm.addEventListener("submit", );

        

        async function displayHighlights() {
            console.log("fetching highlights");
            let container = new GalleryDocumentContainer();
            container.clear();
            let highlights = [39799, 459055, 437853, 435809, 436535, 360018, 634108, 459080, 435882, 271890, 459054, 436105];
            for (let i = 0; i < highlights.length; i++) {
                let artwork = await GalleryAPI.getSearchResult(highlights[i]);
                container.addArtworkToDocument(artwork);

            }
        }

        document.addEventListener('DOMContentLoaded', event => {
            const params = (new URL(document.location)).searchParams;
            const searchTerm = params.get('q');
            if (!searchTerm ) {
                displayHighlights();
                return;
            }})
    