import { Artwork } from './artwork.js';
import { retrieveArtwork, storeArtwork } from './cache.js';

const baseUrl = 'https://collectionapi.metmuseum.org/public/collection/v1';
const searchEndpoint = baseUrl + '/search';
const objectsEndpoint = baseUrl + '/objects';

/**
 * Returns the total count and all matched artworks 
 * @param {string} query 
 */
export async function search(query) {
    try {
        const url = `${searchEndpoint}?hasImages=true&q=${encodeURI(query)}`;
        const response = await fetch(url);
        const data = await response.json();
        return { 'total': data.total, 'artworks': await resolveArtworks(data.objectIDs) };
    }}

export async function resolveArtwork(objectID) {
    const cachedArtwork = retrieveArtwork(objectID);
    if(cachedArtwork !== null)

    const url = `${objectsEndpoint}/${objectID}`;
    const response = await fetch(url);
    const data = await response.json();
    const artwork = new Artwork (data.objectID, data.title, data.artistDisplayName, data.primaryImageSmall, data.objectDate);
    storeArtwork(artwork);
    return artwork;
}

export async function resolveArtworks(objectIDs) {
    try{
        const size = objectIDs.length > 100 ? 100 ;
        const limitedObjectIds = objectIDs.slice(0, size);
        return Promise.all(limitedObjectIds.map (id => {
            return resolveArtwork(id);
        }));
    }