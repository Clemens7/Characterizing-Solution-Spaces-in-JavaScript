/**
 * Retrieves object with the given objectID from the local storage
 * @param {*} objectID 
 */
export function get(key) {
    if (key in window.localStorage) 
}

/**
 * Puts given data in the local storage with the given key
 * @param {*} key 
 * @param {*} data 
 */
export function store(key, data) {
    localStorage[key] = JSON.stringify(data);
}