import { Picture } from './picture.js';
import * as PictureCache from './picture-storage.js';

/**
 * Max amount of object IDs returned by the Search API
 */
const SEARCH_RESULT_SIZE = 100;

/**
 * Returns a new Picture object containing data for the given object ID
 * @param {*} objectID 
 */
export async function retrieve_picture(objectID) {
    let picture = PictureCache.get(objectID);
    if(picture)
    

    const url = object_url(objectID);

    try {
        const response = await fetch(url);}

/**
 * Returns object containing objectIDs of search results (max SEARCH_RESULT_SIZE results) and total amount
 * @param {*} searchTerm 
 */
export async function search_pictures(searchTerm) {
    let url = 'highlights.json';
    if (searchTerm) 
    
    try {
        const response = await fetch(url);
        const rawData = await response.json();
        const objectIDs = await (searchTerm  : rawData.highlights);

        return {
            total: objectIDs ? objectIDs.length ,
            objectIDs: (objectIDs ? objectIDs.slice(0, SEARCH_RESULT_SIZE) ),
        }
    }}

/**
 * Returns highlight object IDs from highlights.json
 */
export 

/**
 * Returns the CORS proxy URL of the Object API endpoint for the given object ID
 * @param {*} objectID 
 */
function object_url(objectID) {
    const API_URL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;
    return API_URL;
}

/**
 * Returns the CORS proxy URL of the Search API endpoint for the given search term
 * @param {*} searchTerm 
 */


/**
 * Returns a CORS proxy URL of the given URL
 * @param {*} url 
 */
