const key = 'cart';

/**
 * Adds a configured artwork to cart (avoiding duplicates), stored under the key 'cart' in local storage
 * If this key 'cart' does not yet exist, it is created
 * @param id: artwork ID
 * @param printSize: artwork print size - either 'S', 'M' or 'L'
 * @param frameStyle: artwork frame style as a string
 * @param frameWidth: artwork frame width in mm
 * @param matColor: artwork mat color as a string
 * @param matWidth: artwork mat width in mm
 */
export 

/**
 * Returns the number of items in the cart
 * @returns an integer
 */
export function getCartItemCount() {
    return key in localStorage  : 0;
}

/**
 * Returns whether the passed in artwork configuration is already in the cart
 * @param object: artwork configuration
 * @param cart: cart array
 * @returns {boolean}
 */
