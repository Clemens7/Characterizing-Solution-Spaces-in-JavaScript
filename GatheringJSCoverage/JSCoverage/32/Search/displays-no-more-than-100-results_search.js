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
    if (searchString == null || searchString == "")  else {
        searchInfo.innerText = "Searching for “" + searchString + "”...";
        artIDs = await retrieveObjectIDs(searchString);
        searching = true;
    }

    //searching arts
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    if(artIDs != null){
        artIDs = artIDs.splice(0, 100);
        artsFound = artIDs.length;

        if(artsFound == 0) 

        for(let artID of artIDs){
            createArt(artID).then((result) => artsLoaded++);
        }
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
    constructor(id, artist, title, date, url) {
        this.id = id
        this.artist = artist;
        this.title = title;
        this.date = date;
        this.url = url;
    }
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
function createArtHTML(art){
    const galleryItem = document.createElement("div");
    galleryItem.className = "thumb";

    galleryItem.innerHTML = "<a href=\"config.html?object-id=" + art.id + "\" id=\"object-0\">\n" +
        "          <img src=\"" + art.url + "\" alt=\"\" id=\"object-image-0\">\n" +
        "          <div class=\"museum-label\">\n" +
        "            <span class=\"artist\">" + art.artist + "</span>\n" +
        "            <span class=\"title\">" + art.title + "</span>,\n" +
        "            <span class=\"date\">" + art.date + "</span>\n" +
        "          </div>\n" +
        "        </a>";

    return galleryItem;
}

async function createArt(objectID){
    const gallery = document.getElementById("gallery");
    const searchInfo = document.getElementById("search-info");

    let art = await getArt(objectID);
    let artHTML = createArtHTML(art);
    gallery.appendChild(artHTML);

    if(artsLoaded < artsFound - 1){
        searchInfo.innerText = (searching ? "Searching for “" + searchString + "”...");
    } else {
        searchInfo.innerText = (searching ? "Found " + artsFound + " " + (artsFound == 1  : "artworks") + " for “" + searchString + "”" );
    }
}

/**
 @param objectID id of an art object in the Metropolitan Museum of Art Collection API
 @returns an Art object if it has an image
 */
async function getArt(objectID){
    const response = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + objectID);
    const object = await response.json();
    let art = new Art(objectID, object.artistDisplayName, object.title, object.objectDate, object.primaryImageSmall);

    //cache response in local storage
    let cachedResponse = window.localStorage.getItem("arts");
    if(cachedResponse === null)

    let cachedArts = JSON.parse(cachedResponse);
    cachedArts.push(art);
    window.localStorage.setItem("arts", JSON.stringify(cachedArts));

    return art;
}