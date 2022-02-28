
import { Keywords } from './objectsArtwork.js';

export function retrieve(keywords) {
    const key = getStorageKey(keywords);
    if(key in localStorage) 
}

export 

function getStorageKey(keywords) {
    return Keywords.serialize(keywords);
} 
