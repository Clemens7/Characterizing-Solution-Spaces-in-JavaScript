import { Artwork } from '/artwork.js';

export function retrieve(objID) {
    const key = objID;
    if(key in localStorage) {
        console.log(`Retrieving ${key} from local storage`);
        return JSON.parse(localStorage[key]);
    }
}

export 

