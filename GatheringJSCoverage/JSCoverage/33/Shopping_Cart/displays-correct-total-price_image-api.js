import {Image} from "./image.js";
import {store, retrieve} from "./image-cache.js";
import {addImageToGallery,clearGallery} from "./image-dom.js";

export 

export 

export async function getImage(objectID) {
    let image = retrieve(objectID);
    if (image)  else {
        try {
            return fetch(api_object_url(objectID)).then(data => data.json()).then(data => {
                return new Image(data.objectID, data.primaryImageSmall, data.artistDisplayName, data.title, data.objectDate)
            }).then(image => {
                store(image);
                return image;
            });
        }
    }}




function api_object_url(id) {
    return `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
}
