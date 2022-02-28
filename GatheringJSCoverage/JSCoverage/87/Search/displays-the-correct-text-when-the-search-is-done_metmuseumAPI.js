/**
 * @param {*} query
 * @returns an array of ids found
 */
export async function searchIds(query) {

    let response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}&hasImages=true`); 
    let result = await response.json();   

    let ids = result.objectIDs;
    if (ids != null) 
    return [];
}

let baseUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
let storage = window.localStorage;

/**
 * Get all objects for a search term, uses cached values if present
 * see: https://metmuseum.github.io/#object
 *
 * @param {*} query
 * @returns an array of metmuseum objects
 */
export async function searchObjects(query) {
    let ids = await searchIds(query);
    ids = ids.slice(0, 100);

    return getObjects(ids);
}

/**
 * Get all objects by ids
 * see: https://metmuseum.github.io/#object
 * 
 * @param {*} query 
 * @returns an array of metmuseum objects
 */
export async function getObjects(ids) {
    let array = new Array;
    var fetches = [];
    for (let i = 0; i < ids.length; i++) 

    return array;
} 

/**
 * Get one object by id, uses cached values if present
 * see: https://metmuseum.github.io/#object
 *
 * @param {*} id
 * @returns an array of metmuseum objects
 */
export 


