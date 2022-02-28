import { Artwork } from './artwork.js';

export function retrieve(key) {
    if(key in localStorage) 
}

export function store(key, object) {
    localStorage[key] = JSON.stringify(object);
}