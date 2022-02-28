import { Artwork } from './artwork.js';
import { retrieveArtwork, storeArtwork } from './cache.js';

const baseUrl = 'https://collectionapi.metmuseum.org/public/collection/v1';
const searchEndpoint = baseUrl + '/search';
const objectsEndpoint = baseUrl + '/objects';

/**
 * Returns the total count and all matched artworks 
 * @param {string} query 
 */
export 

export async function resolveArtwork(objectID) {
    const cachedArtwork = retrieveArtwork(objectID);
    if(cachedArtwork !== null){
        return cachedArtwork;
    }}

export 