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
    if(cachedArtwork !== null){
        return cachedArtwork;
    }}

export async function resolveArtworks(objectIDs) {
    try{
        const size = objectIDs.length > 100  : objectIDs.length;
        const limitedObjectIds = objectIDs.slice(0, size);
        return Promise.all(limitedObjectIds.map (id => {
            return resolveArtwork(id);
        }));
    }