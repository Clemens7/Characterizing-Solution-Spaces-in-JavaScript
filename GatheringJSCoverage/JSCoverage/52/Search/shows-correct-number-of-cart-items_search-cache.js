import { Artwork } from '../models.js';

/**
 * @summary Caches a artwork identified by its id.
 * @param {Artwork} searchResult Result which should be cached. Overwrites already existing entry.
 */
export 
/**
 * @summary Loads artwork from cache identified by its id.
 * @param {Number} id Id of artwork which should be retrieved from cache. null if no artwork is found.
 */
export function retrieveResult(id){
    if (!(id in localStorage))
    console.log(`Retrieving object ${id} from cache`);
    return JSON.parse(localStorage[id]);
}
