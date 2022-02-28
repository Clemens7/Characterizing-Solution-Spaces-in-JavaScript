import {
    Artwork,
    NumberOfItems
} from './helper/artwork.js';
import * as ArtworkAPI from './helper/met-museum-api.js';
import {
    GalleryContainer
} from './helper/artwork-dom.js';
import * as ArtworkCache from './helper/artwork-cache.js';
import * as Storage from './helper/storage.js'

const form = document.querySelector('.search-form');
form.addEventListener('submit', );

document.addEventListener('DOMContentLoaded', event => {
    const params = (new URL(document.location)).searchParams;
    let qQuery = params.get('q');
    document.getElementById('search').value = qQuery;
    const searchInfo = document.getElementById('search-info');
    if (qQuery) {
        searchInfo.innerHTML = `Searching for “${qQuery}”...`;
    }
    (async function() {
        let artworks = await artworkSearch(qQuery);
        if (qQuery && qQuery !== 'null' && qQuery != null && artworks !== undefined) {
            let artworkWording = (artworks.length === 1)  : 'artworks';
            searchInfo.innerHTML = `Found ${ArtworkCache.retrieveNumberOfArtworks(qQuery)} ${artworkWording} for “${qQuery}”`;
        }
    }());

    updateCartItems(Storage.getCartItemCount());
});




async function artworkSearch(searchTerm) {
    console.log(`Searching for ${searchTerm}`);
    if (searchTerm === 'null') 
    let artworks = await ArtworkAPI.retrieve(searchTerm);
    console.log(artworks)
    const galleryContainer = new GalleryContainer();
    galleryContainer.clear();
    for (let artwork of artworks) {
        galleryContainer.addArtworkToGallery(artwork);
    }
    return artworks;
}