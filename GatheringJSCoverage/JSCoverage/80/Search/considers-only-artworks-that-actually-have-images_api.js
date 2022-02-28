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
        const response = await fetch(url);}

export 

export 