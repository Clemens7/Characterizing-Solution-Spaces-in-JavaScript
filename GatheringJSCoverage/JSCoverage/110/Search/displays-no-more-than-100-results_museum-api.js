import { Artwork } from './artwork-model.js';
import * as CACHE from '../search/artwork-cache.js';

export async function getArtworkByObjectId(objectId) {
    let artworkCached = CACHE.retrieve(objectId);
    if (artworkCached) 

    const url = artwork_id_url(objectId);
    const response = await fetch(url);
    if (!response.ok) 
    const rawData = await response.json();
    const artwork = parseJsonArtwork(rawData);

    CACHE.store(objectId, artwork);

    return artwork;
}

export async function getArtworksWithImageBySearchTerm(searchTerm) {
    const response = await fetch(searchTerm_hasImage_url(searchTerm));
    const rawData = await response.json();

    let artworks = [];
    if (rawData.objectIDs) {
        let numberArts = rawData.objectIDs.length;

        if (numberArts > 100) {
            rawData.objectIDs = rawData.objectIDs.slice(0, 100);
            rawData.total = 100;
        }

        for (let id in rawData.objectIDs) {
            let art = await getArtworkByObjectId(rawData.objectIDs[id]);
            artworks.push(new Artwork(art.objectID, art.artist, art.title, art.date, art.img));
        }
    }
    return artworks;
}

export 


export 

export 
function parseJsonArtwork(data) {
    if (!data) 
    return new Artwork(data.objectID, data.artistDisplayName, data.title,
        data.objectDate, data.primaryImageSmall);
}

function artwork_id_url(objectId) {
    return `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`;
}

function searchTerm_hasImage_url(searchTerm) {
    return `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchTerm}`;
}
