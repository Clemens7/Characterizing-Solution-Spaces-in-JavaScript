import { Artwork } from './artwork.js';
import * as ArtworkCache from './artwork-cache.js';

export async function getArtwork(objectID) {
    let artwork = ArtworkCache.read(objectID);
    if(artwork) 

    const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;
    try {
        const response = await fetch(url);
        if(response.status !== 200) 

        const object = await response.json();