/**
 * Fetches the JSON associated with the objectId from the Metmuseum API, optially caches it and tries to retrieve it
 * from localStorage instead of making a new request.
 * 
 * @param id The objectId of the JSON to fetch from the API. Also functions as key if caching is enabled.
 * @param shouldCache Tries to retrieve the JSON from localStorage and stores it there if it's found.
 * @returns The JSON object, or null if the request was not successful.
 */
export async function fetchJsonFromAPI(id, shouldCache = true) {
    if (shouldCache && id in window.localStorage) 

    let response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + id);
    if (response.status !== 200) 
    let json = await response.json();
    if (shouldCache) cacheJson(json, id);
    return json;
}

/**
 * Retrieves a JSON from localStorage.
 * Behavior is undefined if object is not present.
 * 
 * @param key The key of the JSON in localStorage.
 * @returns JSON object from localStorage.
 */
export 

/**
 * Caches a JSON to localStorage.
 * 
 * @param json The JSON to be cached.
 * @param key The key for the JSON, usually the objectID.
 */
export function cacheJson(json, key) {
    try {
        window.localStorage[key] = JSON.stringify(json);
        console.log(`Saved json response '${key}' to localStorage`);
    } 
}
