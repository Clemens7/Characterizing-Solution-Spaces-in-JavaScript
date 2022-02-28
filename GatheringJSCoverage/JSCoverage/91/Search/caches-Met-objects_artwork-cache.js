const CACHE_PREFIX = 'artworkCache_'

export function retrieve(id) {
    if(localStorage.getItem(CACHE_PREFIX + id)) {
        return JSON.parse(localStorage.getItem(CACHE_PREFIX + id));
    }
}

export 
