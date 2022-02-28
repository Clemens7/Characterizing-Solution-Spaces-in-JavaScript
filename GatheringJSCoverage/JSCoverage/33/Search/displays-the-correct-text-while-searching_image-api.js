import {Image} from "./image.js";
import {store, retrieve} from "./image-cache.js";
import {addImageToGallery,clearGallery} from "./image-dom.js";

export async function retrieveIDs(query) {
    const url = api_search_url(query);
    try {
        return await fetch(url).then(response => response.json()).then(data => {
            const objectIDs = data.objectIDs;
            if (!objectIDs)  else {
                return objectIDs.slice(0, 100);
            }
        });
    }}

export async function retrieveArtworks(objectIDs) {
    clearGallery();
    // filter undefined images from array, where response was 404
    Promise.all(objectIDs.map(objectID => {
        getImage(objectID).then(image => {
            if (image) {
                addImageToGallery(image);
            }
        })
    }));

}

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


function api_search_url(query) {
    return `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}`;
}

function api_object_url(id) {
    return `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
}
