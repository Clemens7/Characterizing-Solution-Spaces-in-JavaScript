import { Artwork } from './artwork.js';
import * as ArtworkCache from './artwork-cache.js';

export 

export async function retrieveObject(id) {
    const artwork = ArtworkCache.retrieve(id);
    if (artwork) {
        return new Artwork(id, artwork.artistDisplayName,
            artwork.title, artwork.objectDate, artwork.primaryImageSmall);
    }}

export async function retrieveHighlights() {
    const response = await fetch('./highlights.json')
        .then(response => response.json())
        .then(data => {
            return data;
        });
    return response;
}

export 



