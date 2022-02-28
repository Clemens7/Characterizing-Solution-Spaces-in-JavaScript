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
            if (artworkGallery.amountArtworkCached(searchTerm) === objectIds.length) 
            else {
                Promise.all(promisesObjectEndpoint(objectIds.splice(0, 100), searchTerm)).then(() => {
                    const noun = artworkGallery.artworkPresent.length === 1  : "artworks";
                    artworkGallery.updateInfoMessage('Found ' + artworkGallery.artworkPresent.length + ' ' + noun + ' for  “' + searchTerm + '”');
                    artworkGallery.cacheGallery(searchTerm);
                });
            }
        });
    }
}
function promisesObjectEndpoint(objectIds, searchTerm) {
    return objectIds.map((objectID, index) => {
        return fetch(baseUrlObjectEndpoint + objectID)
            .then(res => res.json())
            .then(data => {
            artworkGallery.addArtworkToGallery(searchTerm, new Artwork(data.objectID, data.artistDisplayName, data.title, data.objectDate, data.primaryImageSmall, index));
        });
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const shoppingCart = new ShoppingCart();
    artworkGallery = new ArtworkGallery('gallery', 'search-info');
    shoppingCart.setShoppingCartLinkValue();
    handleSearchQuery();
});
class Artwork {
    constructor(objectId, artist, title, date, imgLink, posId) {
        this.objectId = objectId;
        this.artist = artist;
        this.title = title;
        this.date = date;
        this.imgLink = imgLink;
        this.posId = posId;
    }
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
    addArtworkToGallery(searchKey, artwork) {
        if (!artwork)
            
        this.artworkPresent.push(artwork);
        this.appendArtworkToGallery(artwork);
        // this.cacheItem(searchKey, artwork);
    }
    cacheGallery(searchKey) {
        localStorage.setItem(searchKey, JSON.stringify(this.artworkPresent));
    }
    amountArtworkCached(searchKey) {
        const cachedArtworks = JSON.parse(localStorage.getItem(searchKey));
        if (cachedArtworks) 
        return -1;
    }
    
    
}
