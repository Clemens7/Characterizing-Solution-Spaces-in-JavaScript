import {Image} from "./image.js";
import {store, retrieve} from "./image-cache.js";
import {addImageToGallery,clearGallery} from "./image-dom.js";

export 

export 

export async function getImage(objectID) {
    let image = retrieve(objectID);
    if (image) {
        return image;
    }}





