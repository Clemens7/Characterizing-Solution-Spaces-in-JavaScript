import {Image} from "./image.js";
import {store, retrieve} from "./image-cache.js";
import {addImageToGallery,clearGallery} from "./image-dom.js";

export async function retrieveIDs(query) {
    const url = api_search_url(query);
    try {
        return await fetch(url).then(response => response.json()).then(data => {
            const objectIDs = data.objectIDs;
            if (!objectIDs) {
                return [];
            }
        });
    }}

export async function retrieveArtworks(objectIDs) {
    clearGallery();
    // filter undefined images from array, where response was 404
    Promise.all(objectIDs.map());

}

export 


function api_search_url(query) {
    return `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}`;
}


