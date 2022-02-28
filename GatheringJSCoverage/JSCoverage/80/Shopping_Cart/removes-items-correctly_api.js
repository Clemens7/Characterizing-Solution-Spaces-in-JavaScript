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
    }

    const url = `${objectsEndpoint}/${objectID}`;
    const response = await fetch(url);
    const data = await response.json();
    const artwork = new Artwork (data.objectID, data.title, data.artistDisplayName, data.primaryImageSmall, data.objectDate);
    storeArtwork(artwork);
    return artwork;
}

export 