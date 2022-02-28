import { Picture } from './datastructures.js';

/**
 * retrieves the element from the Metropolitan Museum of Art Collection API which has the given id
 * 
 * @param id the id of the element
 */
export async function retrieve_id(id) {
    const url = api_url_id(id);
    try {
        const response = await fetch(url);
        const responsePicture = await response.json();
        const picture = new Picture(responsePicture.objectID,
            responsePicture.title,
            responsePicture.artistDisplayName,
            responsePicture.primaryImage,
            responsePicture.primaryImageSmall,
            responsePicture.objectDate,
            responsePicture.objectURL);
        return picture;
    }}

/**
 * creates a url to get an object by id from the Metropolitan Museum of Art Collection API
 * 
 * @param id the id of the object
 * @returns the url needed to get the object
 */
function api_url_id(id) {
    const API_URL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
    return API_URL;
}

/**
 * creates a url to get a list of all objects with the search parameter from the Metropolitan Museum of Art Collection API
 * 
 * @param parameter the search parameter for the objects
 * @returns the url needed to get the object
 */
export 
