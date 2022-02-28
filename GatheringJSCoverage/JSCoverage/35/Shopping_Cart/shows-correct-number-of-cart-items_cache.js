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
    if ('cart' in localStorage) {
        console.log(`Retrieving cart from local storage`);
        try {
            const cartItems = JSON.parse(localStorage['cart']);
            if (!Array.isArray(cartItems)) 
            return cartItems.map();
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
