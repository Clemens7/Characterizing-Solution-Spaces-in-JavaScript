import {Artmart, Searchterm} from "./artmart.js";
import * as ArtmartCache from "./artmart-cache.js";

/**
 * General search function by term returns object ids
 * @param {string} searchterm - The term for search.
 * @returns {Object<int>} objectIds - Object/Array with the found object ids.
 */
export async function search(searchterm) {
    const searchUrl = api_url_objectIds(searchterm);

    try {
        const response = await fetch(searchUrl);
        const rawData = await response.json();
        const objectIds = await rawData.objectIDs;
        console.log(objectIds);

        return objectIds;
    }function api_url_objectIds(searchterm) {
        return `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${Searchterm.replaceBlank(searchterm)}`;
    }}

/**
 * Retrieve the object-data by id
 * @param {integer} objectID - The term for search.
 * @returns {Artmart} Artmart - Returns new Artmart-Object.
 */
export 
