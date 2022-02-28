import * as CACHE from './search-cache.js';
import { Artwork } from '../models.js';
/**
 * @summary Met Museum API URL
 */
const API_URL = "https://collectionapi.metmuseum.org/public/collection/v1";
/**
 * @summary Accesses search api with given query string looking for objects which have images.
 * @param {String} q Search query.
 */
export async function search(q){
    if (!q){
        const highlightsPromise  = await fetch("./highlights.json");
        const rawData = await highlightsPromise.json();
        return rawData.highlights;
    };
}
/**
 * @summary Accesses objects api endpoint with given objectID, retrieving details of a artwork.
 * @param {Number} objectID ObjecID of artwork.
 */
export async function retrieveArtworkDetails(objectID){
    let artwork = CACHE.retrieveResult(objectID);
    if(artwork) return artwork;}
/**
 * @summary Inserts search query string into Met Museum search api endpoint
 * @param {String} q Search query.
 */

/**
 * @summary Inserts object id into Met Museum objects api endpoint.
 * @param {Number} objectID ObjectId of artwork.
 */

