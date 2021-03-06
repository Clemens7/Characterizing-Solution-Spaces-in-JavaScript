import { ShoppingCart } from "./classes.js";
//Questions:
// corresponding frame configuration page?
const baseUrlSearchEndpoint = "https://collectionapi.metmuseum.org/public/collection/v1/search?";
const baseUrlObjectEndpoint = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
const highlightsPath = './highlights.json';
const searchInputElement = document.getElementById('search');
const submitButton = document.getElementById('search-button');
const searchInfo = document.getElementById('search-info');
const gallery = document.getElementById('gallery');
let objectIds = [];
let artworkGallery;
function getSearchParam(key) {
    return new URL(document.location.href).searchParams.get(key);
}
submitButton.addEventListener('click', );
function handleSearchQuery() {
    artworkGallery.clearGallery();
    const searchTerm = getSearchParam("q");
    if (searchTerm) {
        searchInfo.textContent = `Searching for “${searchTerm}”...`;
        const urlSearchEndpoint = baseUrlSearchEndpoint + "q=" + searchTerm + "&hasImages=true";
        fetch(urlSearchEndpoint)
            .then()
            .then().then();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const shoppingCart = new ShoppingCart();
    artworkGallery = new ArtworkGallery('gallery', 'search-info');
    shoppingCart.setShoppingCartLinkValue();
    handleSearchQuery();
});
class Artwork {
    
}
class ArtworkGallery {
    constructor(galleryId, infoId) {
        this.gallery = document.getElementById(galleryId);
        this.infoDisplay = document.getElementById(infoId);
        this.artworkPresent = JSON.parse(localStorage.getItem('galleryItems')) || new Array();
    }
    
    clearGallery() {
        this.gallery.innerHTML = '';
        this.artworkPresent = new Array();
    }
    
    
    
    
    
    
}
