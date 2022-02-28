import { Artwork, Configuration } from './classes.js';

/**
 * Attempts to retrieve the artwork from the cache, if it exists. Otherwise, returns null.
 * @returns {Artwork|undefined}
 */
export 

/**
 * @param artwork {Artwork}
 */
export 

/**
 * @returns {Configuration[]}
 */
export function readCartFromCache() {
    if ('cart' in localStorage)  else {
        return [];
    }
}

export function readCartSizeFromCache() {
    if ('cart' in localStorage)  else {
        return 0;
    }
}

/**
 * @param cart {Configuration[]}
 */
export 
