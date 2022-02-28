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
    if(cachedArts === null){
        window.localStorage.setItem("arts", "[]");
    }

    //cart items
    let cart = window.localStorage.getItem("cart");
    if(cart === null) cart = "[]";

    let json = JSON.parse(cart);
    cartInfo.innerText = "Cart (" + json.length + ")";

    //show arts when page is loaded
    const url = new URLSearchParams(window.location.search);
    let querySearch = url.get("q");
    let lastSearch = window.localStorage.getItem("lastSearch");


    if(lastSearch === null ) {
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
    if (searchString == null || searchString == "") {
        searchInfo.innerText = "Search our collection of more than 400,000 artworks.";
        searching = false;

        let data = await fetch("highlights.json");
        let json = await data.json();
        artIDs = json.highlights;
    }

    //searching arts
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    if(artIDs != null){
        artIDs = artIDs.splice(0, 100);
        artsFound = artIDs.length;

        if(artsFound == 0) 

        for(let artID of artIDs){
            createArt(artID).then();
        }
    }
}

function parseSearch(searchItems){
    if(searchItems != null) 
    else return "";
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


/**
 * @param an Art Object
 * @returns a gallery item as HTML element
 */


async function createArt(objectID){
    const gallery = document.getElementById("gallery");
    const searchInfo = document.getElementById("search-info");

    let art = await getArt(objectID);}

/**
 @param objectID id of an art object in the Metropolitan Museum of Art Collection API
 @returns an Art object if it has an image
 */
async function getArt(objectID){
    const response = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + objectID);
    const object = await response.json();