/**
 * Loads the item with the name key from the local-storage.
 *
 * @param key key to load
 */
export function get(key) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) 
}

/**
 * Sets the item in the localstorage.
 *
 * @param key key to store item in
 * @param callback results from the callback are stored in the local-storage
 */
export async function set(key, callback) {
    return localStorage.setItem(key, JSON.stringify(await callback()))
}

/**
 * Removes the key from the local-storage.
 *
 * @param key key to remove.
 */
export 
