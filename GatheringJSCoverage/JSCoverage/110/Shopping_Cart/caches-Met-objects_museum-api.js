import { Artwork } from './artwork-model.js';
import * as CACHE from '../search/artwork-cache.js';

export async function getArtworkByObjectId(objectId) {
    let artworkCached = CACHE.retrieve(objectId);
    if (artworkCached) {
        return artworkCached;
    }}

export 

export 


export 

export async function getArtworksByIdListAsync(ids) {
    let artworks = [];
    for (let id of ids) {
        const currArtWork = await getArtworkByObjectId(id);
        artworks.push(currArtWork);
    }
    return artworks;
}





