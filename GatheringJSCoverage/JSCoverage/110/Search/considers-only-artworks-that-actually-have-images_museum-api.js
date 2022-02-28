import { Artwork } from './artwork-model.js';
import * as CACHE from '../search/artwork-cache.js';

export 

export async function getArtworksWithImageBySearchTerm(searchTerm) {
    const response = await fetch(searchTerm_hasImage_url(searchTerm));}

export 


export 

export 




function searchTerm_hasImage_url(searchTerm) {
    return `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchTerm}`;
}
