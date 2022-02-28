import { Artwork } from './artwork.js';
import * as ArtworkCache from './artwork-cache.js';

export async function getArtwork(objectID) {
    let artwork = ArtworkCache.read(objectID);
    if(artwork) {
        return artwork;
    }