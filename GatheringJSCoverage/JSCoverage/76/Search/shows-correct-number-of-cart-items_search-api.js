import{ Artwork} from './search-result.js';
import * as SearchCache from './search-cache.js';
export async function retrieveArtwork(objectID){
    
    const objectURL= 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
    
    try{ 
    const response = await fetch(objectURL+''+objectID);
    const rawData = await response.json();
    let responseArtwork= await rawData;
    
    let artwork = new Artwork(responseArtwork.objectID,responseArtwork.title,responseArtwork.artistDisplayName, responseArtwork.objectDate, responseArtwork.primaryImage, responseArtwork.primaryImageSmall, responseArtwork.medium);    
    return artwork
    }}
 

export 

