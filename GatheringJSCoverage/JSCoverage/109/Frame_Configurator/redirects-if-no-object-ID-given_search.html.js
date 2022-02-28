
    import * as Cache from './artwork-cache.js';
    import { Artwork } from './artwork.js';
    import * as CartHelper from './cartHelper.js';

    CartHelper.getCartItemNumber();

    // const noOfCartItems = ..get this number from cart.html
    // document.getObjectById("cart-link").innerHTML = `Cart(${noOfCartItems})`;

    const searchInput = document.getElementById(`search`);
    searchInput.addEventListener(`click`, )

    document.addEventListener(`DOMContentLoaded`, event => {
        const params = (new URL(document.location)).searchParams;
        const keyword = params.get(`q`);
        searchArtworks(keyword);
    });

    const form = document.querySelector(`#search-section form`);
    form.addEventListener(`submit`, );

    async function searchArtworks(keyword) {
        var objectIDs;
        if (!keyword) {
            // displayHighlightsInThisCase
            const responseRaw = await fetch('./highlights.json');
            const response = await responseRaw.json();
            objectIDs = response.highlights;
            document.getElementById("search-info").innerHTML = 'Search our collection of more than 400,000 artworks.';
        }
        buildGallery(objectIDs);

    }

    async function buildGallery(objectIDs) {
        var gallery = document.getElementById("gallery");
        gallery.innerHTML = '';

        for (const objectID of objectIDs) {
            const artwork = await getArtwork(objectID);}

    async function getArtwork(objectID) {
        var artwork = Cache.retrieve(objectID);

        //if the artwork is not in the cache, load it from the API and store it in the cache
        if(!artwork) {
            const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/`+objectID);}

  