
import { Keywords } from './objectsArtwork.js';

export function retrieve(keywords) {
    const key = getStorageKey(keywords);
    if(key in localStorage) {
        console.log(`Retrieving ${key} from local storage`);
        return JSON.parse(localStorage[key]);
    }
}

export 

function getStorageKey(keywords) {
    return Keywords.serialize(keywords);
} 
