import{ Artwork} from './search-result.js';
import * as SearchCache from './search-cache.js';
export 
 

export async function searchArtworks(searchQuery) {
    let artworks = SearchCache.retrieve(searchQuery);
    if(artworks){
        return artworks;
    }}

