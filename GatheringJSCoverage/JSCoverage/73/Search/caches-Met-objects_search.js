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
            .then(res => res.json())
            .then(data => {
            if (data.total === 0) 
            data.objectIDs.forEach((d) => objectIds.push(d));
        }).then(() => {
            if (artworkGallery.amountArtworkCached(searchTerm) === objectIds.length) {
                artworkGallery.loadGalleryFromCache(searchTerm);
            }
        });
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
    appendArtworkToGallery(artwork) {
        gallery.innerHTML += `
        <div class="thumb">
            <a href="config.html?objectID=${artwork.objectId}" id="object-${artwork.posId}">
            <img src="${artwork.imgLink}" alt="" id="object-image-${artwork.posId}">
            <div class="museum-label">
                <span class="artist">${artwork.artist}</span>
                <span class="title">${artwork.title}</span>,
                <span class="date">${artwork.date}</span>
            </div>
            </a>
        </div>
    `;
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
        if (cachedArtworks) {
            return cachedArtworks.length;
        }}
    
    loadGalleryFromCache(searchKey) {
        const cachedArtworks = JSON.parse(localStorage.getItem(searchKey));
        const noun = cachedArtworks.length === 1  : "artworks";
        if (searchKey !== 'highlights') {
            this.updateInfoMessage('Found ' + cachedArtworks.length + ' ' + noun + ' for  “' + searchKey + '”');
        }
        cachedArtworks.forEach(artwork => {
            this.appendArtworkToGallery(artwork);
        });
    }
}
