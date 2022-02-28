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
    }}
