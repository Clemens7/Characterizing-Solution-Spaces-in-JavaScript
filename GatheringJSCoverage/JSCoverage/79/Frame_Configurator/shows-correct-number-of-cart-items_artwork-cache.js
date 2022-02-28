import { Artwork } from './artwork.js';

export function retrieve(key) {
    if(key in localStorage) {
        return JSON.parse(localStorage[key]);
    }
}

export 