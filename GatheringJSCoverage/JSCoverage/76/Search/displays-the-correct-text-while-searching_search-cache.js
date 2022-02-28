import { Artwork} from './search-result.js';

export function retrieve(searchQuery) {
    const key = searchQuery;
    if(key in localStorage) 
}

export function store(searchQuery, artworks) {
    const key = searchQuery;
    console.log(`Storing ${key} in local storage`);
    localStorage[key] = JSON.stringify(artworks);
}

