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


    if(lastSearch === null || lastSearch != querySearch)  else if (lastSearch == querySearch) {
        const gallery = document.getElementById("gallery");
        gallery.innerHTML = "";
        let arts = JSON.parse(cachedArts);

        for(let art of arts){
            gallery.appendChild(createArtHTML(art));
        }
    }

    form.addEventListener("submit", );
}



/**
 * searching for arts
 * @param searchItems as search term
 * @returns {Promise<void>}
 */




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



/**
 @param objectID id of an art object in the Metropolitan Museum of Art Collection API
 @returns an Art object if it has an image
 */
