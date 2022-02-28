import{ Artwork} from './search-result.js';
import * as SearchCache from './search-cache.js';
export 
 

export async function searchArtworks(searchQuery) {
    let artworks = SearchCache.retrieve(searchQuery);
    if(artworks)
    
    
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=';
    
    
    
    try{
        const response = await  fetch(url+searchQuery);}

