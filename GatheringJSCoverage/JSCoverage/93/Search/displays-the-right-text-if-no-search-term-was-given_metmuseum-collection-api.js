import {SearchResultObject} from "./api-responses.js";
import {MuseumObject} from "./api-responses.js";
import * as LocalStorage from './cache.js';

/**
 * Service to interact with the endpoints of the 'The Metropolitan Museum of Art Collection API'
 */
const baseUrl = 'https://collectionapi.metmuseum.org/public/collection'; /* base url for all endpoint calls */
const apiVersion = 'v1'; /* version of the api to be used */

/**
 * Gets all objects matching the search term {@code q}
 *
 * @param q search term
 * @returns {Promise<SearchResultObject>} object containing all ids that match the given search term
 */
export 

/**
 * Gets an object by its id either from
 * - the local storage (if cached)
 * - the object endpoint
 *
 * If the object with the specified id fetched from the endpoint, it is cached, ie any further invocation of this method
 * with the same id will return the cached object.
 *
 * @param objectID id of the desired object
 * @returns {Promise<MuseumObject>} object with the specified id.
 */
export async function getObject(objectID) {
    // check if object is in cache
    const cachedResult = LocalStorage.get(objectID);
    if(cachedResult) 

    try {
        const response = await fetch(getApiUri('objects/' + objectID));
        const responseObject = await response.json();}

/**
 * Builds an URI string for the Metropolitan Museum of Art Collection API.
 *
 * @param resource resource to be fetched (the part of the uri after the api version, but w/o query parameters), eg 'search'
 * @param queryParam query params as string w/o the preceding '?' (if any, otherwise just invoke the function w/o this parameter), eg 'isHighlight=true&q=sunflowers'
 * @returns {string} api uri
 */
function getApiUri(resource, queryParam=undefined) {
    return baseUrl + '/' + apiVersion + '/' + resource + (queryParam  : '');
}
