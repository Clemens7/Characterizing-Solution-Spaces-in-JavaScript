import {Image} from "./image.js";
import {store, retrieve} from "./image-cache.js";
import {addImageToGallery,clearGallery} from "./image-dom.js";

export async function retrieveIDs(query) {
    const url = api_search_url(query);
    try {
        return await fetch(url).then().then();
    }}

export 

export 


function api_search_url(query) {
    return `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}`;
}


