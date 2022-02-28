
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
        if (!keyword)  else {
            document.getElementById("search-info").innerHTML = `Searching for “${keyword}”...`;
            const responseRaw = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${keyword}`);)} for “${keyword}”`;

            const objectIDsQuery = response.objectIDs;
            objectIDs = objectIDsQuery.slice(0,100);
        }}

    

    

  