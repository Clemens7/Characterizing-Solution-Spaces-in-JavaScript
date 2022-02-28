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
    if (stored !== null) {
        console.log(`Artwork ${key} found in cache`);
        let artwork = new Artwork();
        artwork.objectID = key;
        artwork.artist = stored.artist;
        artwork.date = stored.date;
        artwork.title = stored.title;
        artwork.imageSrc = stored.imageSrc;
        return artwork;
    }}
/**
 * Stores the given artwork in the cache.
 * @param artwork The artwork to store in the cache.
 */
export 
