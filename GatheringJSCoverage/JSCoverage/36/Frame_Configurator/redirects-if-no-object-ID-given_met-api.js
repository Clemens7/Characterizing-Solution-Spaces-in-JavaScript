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
export 

export async function getHighlightSearchResult(objectIds){
    let cachedArtworks = Cache.retrieve(undefined);
    if(cachedArtworks)
    let artworks = await getArtworkByIds(objectIds);}


/**
 * Retrieves from the Met API the first 100 (or less) IDs of artworks with an image that result from the search
 * @param searchTerm: search term
 * @returns an array of max 100 artwork IDs
 */


/**
 * Retrieves a all artworks by an array of IDs:
 *  - from the Met API and stores in local storage, if not already stored
 *  - from the local storage, otherwise
 * @param objIds: artwork id's
 * @returns a Promise of artworks
 */
async function getArtworkByIds(objIds) {
    return await Promise.all(objIds.map(async id => {
        return getArtwork(id);
    }))
}


/**
 * Retrieves a single artwork by ID:
 *  - from the Met API and stores in local storage, if not already stored
 *  - from the local storage, otherwise
 * @param id: artwork id
 * @returns an artwork object
 */
export async function getArtwork(id) {
    let artwork = retrieveObject(id);
    if (artwork)
        

    const url = objectApiUrl(id);
    try {
        const response = await fetch(url);}


/**
 * Returns the URL for the Object endpoint of the Met API
 */
function objectApiUrl(artworkId) {
    return `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkId}`;
}

/**
 * Returns the URL for the Search endpoint of the Met API
 */
