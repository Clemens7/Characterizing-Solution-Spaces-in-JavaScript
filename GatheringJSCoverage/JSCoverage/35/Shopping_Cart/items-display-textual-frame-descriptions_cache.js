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
export function readCartFromCache() {
    if ('cart' in localStorage) {
        console.log(`Retrieving cart from local storage`);
        try {
            const cartItems = JSON.parse(localStorage['cart']);
            if (!Array.isArray(cartItems)) 
            return cartItems.map(item => new Configuration(item));
        }
    }
}

export function readCartSizeFromCache() {
    if ('cart' in localStorage) {
        console.log(`Retrieving cart size from local storage`);
        try {
            const cartItems = JSON.parse(localStorage['cart']);
            if (!Array.isArray(cartItems)) 
            return cartItems.length;
        }
    }
}

/**
 * @param cart {Configuration[]}
 */
export 
