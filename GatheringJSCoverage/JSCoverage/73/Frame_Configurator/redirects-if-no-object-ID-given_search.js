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
    if (searchTerm) 
    else {
        fetch(highlightsPath)
            .then(res => res.json())
            .then(data => {
            artworkGallery.updateInfoMessage(`Search our collection of more than 400,000 artworks.`);
            if (data.highlights.length === artworkGallery.amountArtworkCached('highlights')) 
            else {
                localStorage.removeItem(searchTerm);
                artworkGallery.updateInfoMessage(`Search our collection of more than 400,000 artworks.`);
                Promise.all(promisesObjectEndpoint(data.highlights, 'highlights')).then();
            }
        });
    }
}
function promisesObjectEndpoint(objectIds, searchTerm) {
    return objectIds.map((objectID, index) => {
        return fetch(baseUrlObjectEndpoint + objectID)
            .then()
            .then();
    });
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
    updateInfoMessage(msg) {
        this.infoDisplay.innerHTML = msg;
    }
    
    
    amountArtworkCached(searchKey) {
        const cachedArtworks = JSON.parse(localStorage.getItem(searchKey));
        if (cachedArtworks) 
        return -1;
    }
    
    
}
