let storage = window.localStorage;
const artworkKey = 'cache';
const cartKey = 'cart';

/**
 * @param artwork Artwork that is stored in the local storage.
 */
export 

/**
 * @param id
 * @return {null|*} Returns the object or null if it is not stored in the local storage.
 */
export 
/**
 * Return The storage cart as an object [{objectID, config},...]
 */
export function getStorageCart() {

    let cart = JSON.parse(storage.getItem(cartKey));
    if (cart === null)  else {
        return cart;
    }
}

/**
 *
 * @return {number|*} The ammount of items in the storage cart
 */
export function getCartLength() {
    let cart = JSON.parse(storage.getItem(cartKey));
    if (cart === null)  else {
        return cart.length;
    }
}

/**
 * @param id The id of the object
 * @param config The configuration of the object
 * Stores the two values as an object in the cart {objectID, config};
 */
export 

