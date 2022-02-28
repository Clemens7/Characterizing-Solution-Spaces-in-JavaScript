
import { Keywords } from './objectsArtwork.js';

export function retrieve(keywords) {
    const key = getStorageKey(keywords);
    if(key in localStorage) 
}

export function store(keywords, data) {
    const key = getStorageKey(keywords);
    console.log(`Storing ${key} in local storage`);
    localStorage[key] = JSON.stringify(data);
}

function getStorageKey(keywords) {
    return Keywords.serialize(keywords);
} 
