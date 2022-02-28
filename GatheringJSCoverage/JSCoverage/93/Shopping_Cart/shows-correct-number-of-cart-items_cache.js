/**
 * Local storage access
 *
 */

/**
 * Gets a value to a key from the local storage
 * @param key desired key
 * @returns {any} value of the specified key
 */
export function get(key) {
    if(key in localStorage) {
        console.log(`Retrieving ${key} from local storage`);
        return JSON.parse(localStorage[key]);
    }
}

/**
 * Stores a key-value-pair into the local storage
 * @param key desired key
 * @param value desired value
 */
export 


export 