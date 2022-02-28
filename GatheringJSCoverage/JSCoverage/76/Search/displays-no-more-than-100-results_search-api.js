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
 

export async function searchArtworks(searchQuery) {
    let artworks = SearchCache.retrieve(searchQuery);
    if(artworks)
    
    
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=';
    
    
    
    try{
        const response = await  fetch(url+searchQuery);
        const rawData = await response.json();
        const responseArtworks = await rawData;
        let artworks = responseArtworks.objectIDs.slice(0,100);
        let results =[];
        for(let a of artworks) {
            results.push(await retrieveArtwork(a));
        }
        
        console.log(results);
        SearchCache.store(searchQuery, results);
        return results;
    }}

