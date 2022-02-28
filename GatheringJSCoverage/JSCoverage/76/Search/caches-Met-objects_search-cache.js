import { Artwork} from './search-result.js';

export function retrieve(searchQuery) {
    const key = searchQuery;
    if(key in localStorage) {
        console.log(`Retrieving ${key} from local storage`);
        
        return JSON.parse(localStorage[key]);
    }
}

export 

