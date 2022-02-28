const maxNrOfFoundArts = 100;
let artsLoaded = 0;
let artsFound = 0;
let searching;
let searchString;
let cachedArts;

/**
 * what happens when window is loaded
 */
window.onload = function () {
    const form = document.getElementsByTagName("form")[0];
    const cartInfo = document.getElementById("cart-link");

    //reset local storage for key "arts"
    cachedArts = window.localStorage.getItem("arts");
    if(cachedArts === null)

    //cart items
    let cart = window.localStorage.getItem("cart");
    if(cart === null) cart = "[]";

    let json = JSON.parse(cart);
    cartInfo.innerText = "Cart (" + json.length + ")";

    //show arts when page is loaded
    const url = new URLSearchParams(window.location.search);
    let querySearch = url.get("q");
    let lastSearch = window.localStorage.getItem("lastSearch");


    if(lastSearch === null || lastSearch != querySearch) {
        window.localStorage.setItem("lastSearch", querySearch);
        search(querySearch);
    }

    form.addEventListener("submit", );
}

async function search(searchItems){
    await artSearch(searchItems);
}

/**
 * searching for arts
 * @param searchItems as search term
 * @returns {Promise<void>}
 */
async function artSearch(searchItems) {
    const searchInfo = document.getElementById("search-info");
    let artIDs;

    searchString = parseSearch(searchItems);

    //update text of search-info
    if (searchString == null || searchString == "")  else {
        searchInfo.innerText = "Searching for “" + searchString + "”...";
        artIDs = await retrieveObjectIDs(searchString);
        searching = true;
    }

    //searching arts
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    if(artIDs != null) else {
        searchInfo.innerText = "Found " + artsFound + " " + (artsFound == 1  : "artworks") + " for “" + searchString + "”";
    }
}

function parseSearch(searchItems){
    if(searchItems != null) return searchItems.replace("+", " ");
}

/**
 * represents an art with properties:
 * - artist
 * - title
 * - date
 * - url to image
 */
class Art {
    
}

/**
 * @param searchItems as search input
 * @returns list of objectIDs from Metropolitan Museum of Art Collection API as {Promise<[]>}
 */
async function retrieveObjectIDs(searchItems){
    const response = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=" + searchItems);
    const rawData = await response.json();
    return rawData.objectIDs;
}

/**
 * @param an Art Object
 * @returns a gallery item as HTML element
 */




/**
 @param objectID id of an art object in the Metropolitan Museum of Art Collection API
 @returns an Art object if it has an image
 */
