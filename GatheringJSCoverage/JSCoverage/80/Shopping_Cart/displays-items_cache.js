import {Artwork} from "./artwork.js";
import {Cart} from "./cart.js";

/**
 * Generates the key for the given objectID to be used as a storage key
 * @param {number} objectID
 * @returns {string}
 */
function getArtworkStorageKey(objectID) {
    return 'a_' + objectID;
}

/**
 * Retrieves the artwork with the given objectID saved in the local storage
 * @param {number} objectID
 * @returns {Artwork|undefined}
 */
export function retrieveArtwork(objectID) {
    const key = getArtworkStorageKey(objectID);
    if (key in localStorage) 
    return null;
}

/**
 * Stores the given artwork in the local storage
 * @param {Artwork} artwork
 */
export function storeArtwork(artwork) {
    const key = getArtworkStorageKey(artwork.objectID);
    console.log(`Storing ${key} in local storage`);
    localStorage[key] = JSON.stringify(artwork);
}

/**
 * Generates the key for the cart to be stored
 * @returns {string}
 */
function getCartStorageKey() {
    return "cart";
}

/**
 * Retrieves the stored cart from the local storage or creates an empty cart
 * @returns {Cart}
 */
export function retrieveCart() {
    let key = getCartStorageKey();
    if (key in localStorage) {
        /** @type {Cart} */
        let cart = new Cart(JSON.parse(localStorage[key]));
        console.log(`Stored cart has ${cart.items.length} items`);
        return cart;
    }
}

/**
 * Stores the given cart in the local storage
 * @param {Cart} cart
 */
export 

