import { Artwork } from './artwork-model.js';
import * as CACHE from '../search/artwork-cache.js';

export async function getArtworkByObjectId(objectId) {
    let artworkCached = CACHE.retrieve(objectId);
    if (artworkCached) {
        return artworkCached;
    }

    const url = artwork_id_url(objectId);
    const response = await fetch(url);
    if (!response.ok) 
    const rawData = await response.json();
    const artwork = parseJsonArtwork(rawData);

    CACHE.store(objectId, artwork);

    return artwork;
}

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
function parseJsonArtwork(data) {
    if (!data) 
    return new Artwork(data.objectID, data.artistDisplayName, data.title,
        data.objectDate, data.primaryImageSmall);
}

function artwork_id_url(objectId) {
    return `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`;
}


