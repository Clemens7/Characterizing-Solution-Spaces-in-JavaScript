import{ Artwork} from './search-result.js';
import * as SearchCache from './search-cache.js';
export 
 

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
        for(let a of artworks) catch(error) {
        console.log(`An error happened when trying to retrieving artwork query from URL ${url+searchQuery}`);
        console.log(error);
    }
    
}

