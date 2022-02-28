import { Artwork, Configuration } from './classes.js';

/**
 * Attempts to retrieve the artwork from the cache, if it exists. Otherwise, returns null.
 * @returns {Artwork|undefined}
 */
export function readArtworkFromCache(objectID) {
    if (objectID in localStorage)  else {
        return undefined;
    }
}

/**
 * @param artwork {Artwork}
 */
export function writeArtworkToCache(artwork) {
    console.log(`Storing ${artwork.objectID} in local storage`);
    localStorage[artwork.objectID] = JSON.stringify(artwork);
}

/**
 * @returns {Configuration[]}
 */
export 

export function readCartSizeFromCache() {
    if ('cart' in localStorage)  else {
        return 0;
    }
}

/**
 * @param cart {Configuration[]}
 */
export 
