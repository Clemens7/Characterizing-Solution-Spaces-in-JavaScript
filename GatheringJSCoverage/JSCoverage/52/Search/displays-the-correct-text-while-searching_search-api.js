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
    if (!q)
    let searchResponse = await fetch(searchAPI(q));
    let searchRawData = await searchResponse.json();

    return (searchRawData.total > 0) ? searchRawData.objectIDs ;
}
/**
 * @summary Accesses objects api endpoint with given objectID, retrieving details of a artwork.
 * @param {Number} objectID ObjecID of artwork.
 */
export async function retrieveArtworkDetails(objectID){
    let artwork = CACHE.retrieveResult(objectID);
    if(artwork) 

    console.log("searching online");
    let artworkResponse = await fetch(objectsAPI(objectID))
    let rawArtworkData = await artworkResponse.json();

    artwork = new Artwork(
        rawArtworkData.objectID,
        rawArtworkData.title,
        rawArtworkData.artistDisplayName,
        rawArtworkData.objectDate,
        rawArtworkData.primaryImageSmall);

    CACHE.storeResult(artwork);
    return artwork;
}
/**
 * @summary Inserts search query string into Met Museum search api endpoint
 * @param {String} q Search query.
 */
function searchAPI(q){
    return `${API_URL}/search?hasImages=true&q=${q}`
}
/**
 * @summary Inserts object id into Met Museum objects api endpoint.
 * @param {Number} objectID ObjectId of artwork.
 */
function objectsAPI(objectID){
    return `${API_URL}/objects/${objectID}`;
}
