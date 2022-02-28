import * as Cache from "../cache/met-cache.js";
import {Artwork} from "./artwork.js";
import {retrieveObject} from "../cache/met-cache.js";

/**
 * Retrieves artworks that result from the search:
 * First gets the resulting artwork IDs by calling getSearchResultsIDs(searchTerm)
 * Then retrieves the artworks one by one by calling getArtwork(id)
 * @param searchTerm: search term
 * @returns an array of artwork objects
 */
export async function getSearchResults(searchTerm) {
    let cachedArtworks = Cache.retrieve(searchTerm);
    if(cachedArtworks)
    const ids = await getSearchResultsIDs(searchTerm);
    if(!ids)
        return [];}

export 


/**
 * Retrieves from the Met API the first 100 (or less) IDs of artworks with an image that result from the search
 * @param searchTerm: search term
 * @returns an array of max 100 artwork IDs
 */
async function getSearchResultsIDs(searchTerm) {
    const url = searchApiUrl(searchTerm);
    try {
        const response = await fetch(url);
        const rawData = await response.json();
        const responseIDs = await rawData.valueOf();

        console.log(`Retrieving a total of ${responseIDs.total} artwork IDs for search term "${searchTerm}" from API:`);
        console.log(responseIDs);

        return responseIDs.objectIDs.slice(0, 100);
    }catch (error) {
        console.log(`Error when trying to retrieve data from URL ${url}`);
        console.log(error);
    }
}

/**
 * Retrieves a all artworks by an array of IDs:
 *  - from the Met API and stores in local storage, if not already stored
 *  - from the local storage, otherwise
 * @param objIds: artwork id's
 * @returns a Promise of artworks
 */



/**
 * Retrieves a single artwork by ID:
 *  - from the Met API and stores in local storage, if not already stored
 *  - from the local storage, otherwise
 * @param id: artwork id
 * @returns an artwork object
 */
export 


/**
 * Returns the URL for the Object endpoint of the Met API
 */


/**
 * Returns the URL for the Search endpoint of the Met API
 */
function searchApiUrl(searchTerm) {
    return `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchTerm}`;
}