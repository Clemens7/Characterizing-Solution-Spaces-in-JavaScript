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
    if(key in localStorage) 
}

/**
 * Stores a key-value-pair into the local storage
 * @param key desired key
 * @param value desired value
 */
export function save(key, value) {
    console.log(`Storing ${key} in local storage`);
    localStorage[key] = JSON.stringify(value);
}


export 