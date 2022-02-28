const CACHE_PREFIX = 'artworkCache_'

export function retrieve(id) {
    if(localStorage.getItem(CACHE_PREFIX + id)) 
}

export function store(id, artwork) {
    localStorage.setItem(CACHE_PREFIX + id, JSON.stringify(artwork));
}
