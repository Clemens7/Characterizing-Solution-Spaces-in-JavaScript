import { Artwork, Configuration } from './classes.js';

/**
 * Attempts to retrieve the artwork from the cache, if it exists. Otherwise, returns null.
 * @returns {Artwork|undefined}
 */
export function readArtworkFromCache(objectID) {
    if (objectID in localStorage) {
        console.log(`Retrieving ${objectID} from local storage`);
        try {
            return new Artwork(JSON.parse(localStorage[objectID]));
        }
    }
}

/**
 * @param artwork {Artwork}
 */
export 

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
