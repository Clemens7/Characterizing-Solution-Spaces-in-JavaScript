import { Artwork } from "../model/artwork.js";
import { LocalStorageUtil } from "../util/LocalStorageUtil.js";
/**
 * Retrieves the Artwork of the given ID from the cache.
 * @param objectID The ID of the artwork to fetch from the cache.
 * @returns The artwork if found in the cache, else null.
 */
export function retrieve(objectID) {
    let key = objectID;
    let stored = LocalStorageUtil.retrieve(key);
    if (stored !== null) 
    return null;
}
/**
 * Stores the given artwork in the cache.
 * @param artwork The artwork to store in the cache.
 */
export function store(artwork) {
    console.log(`Artwork ${artwork.objectID} stored in cache`);
    LocalStorageUtil.store(artwork.objectID, artwork);
}
