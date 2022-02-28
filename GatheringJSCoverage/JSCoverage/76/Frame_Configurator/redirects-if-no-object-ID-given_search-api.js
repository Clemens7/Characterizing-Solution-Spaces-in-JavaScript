import{ Artwork} from './search-result.js';
import * as SearchCache from './search-cache.js';
export async function retrieveArtwork(objectID){
    
    const objectURL= 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
    
    try{ 
    const response = await fetch(objectURL+''+objectID);}
 

export 

