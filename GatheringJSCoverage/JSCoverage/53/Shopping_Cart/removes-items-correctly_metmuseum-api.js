import {Artmart, Searchterm} from "./artmart.js";
import * as ArtmartCache from "./artmart-cache.js";

/**
 * General search function by term returns object ids
 * @param {string} searchterm - The term for search.
 * @returns {Object<int>} objectIds - Object/Array with the found object ids.
 */
export 

/**
 * Retrieve the object-data by id
 * @param {integer} objectID - The term for search.
 * @returns {Artmart} Artmart - Returns new Artmart-Object.
 */
export async function retrieveObject(objectID) {
    let artmart = ArtmartCache.retrieveObject(objectID);
    if (artmart) {
        return artmart;
    }

    const objectUrl = api_url_Object(objectID);
    const responseObject = await fetch(objectUrl);

    if (responseObject.status === 404)  else if (responseObject.status !== 200) 

    const objectsRawData = await responseObject.json();
    console.log(objectsRawData);

    artmart = new Artmart(objectsRawData.objectID, objectsRawData.objectDate, objectsRawData.primaryImageSmall,
        objectsRawData.objectName, objectsRawData.title, objectsRawData.artistDisplayName);
    ArtmartCache.store(objectID, artmart);

    return artmart;

    function api_url_Object(objectId) {
        return `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`;
    }
}
