import { Artwork } from './artwork.js';
import * as ArtworkCache from './artwork-cache.js';

export 

export async function retrieveObject(id) {
    const artwork = ArtworkCache.retrieve(id);
    if (artwork) {
        return new Artwork(id, artwork.artistDisplayName,
            artwork.title, artwork.objectDate, artwork.primaryImageSmall);
    }}

export 

export 



