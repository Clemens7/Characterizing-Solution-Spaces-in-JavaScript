import {Image} from "./image.js";
import {store, retrieve} from "./image-cache.js";
import {addImageToGallery,clearGallery} from "./image-dom.js";

export 

export async function retrieveArtworks(objectIDs) {
    clearGallery();
    // filter undefined images from array, where response was 404
    Promise.all(objectIDs.map(objectID => {
        getImage(objectID).then()
    }));

}

export async function getImage(objectID) {
    let image = retrieve(objectID);
    if (image)  else {
        try {
            return fetch(api_object_url(objectID)).then().then().then();
        }
    }}




function api_object_url(id) {
    return `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
}
