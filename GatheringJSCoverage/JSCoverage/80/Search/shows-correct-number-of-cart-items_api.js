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

export async function resolveArtworks(objectIDs) {
    try{
        const size = objectIDs.length > 100  : objectIDs.length;
        const limitedObjectIds = objectIDs.slice(0, size);
        return Promise.all(limitedObjectIds.map (id => {
            return resolveArtwork(id);
        }));
    }