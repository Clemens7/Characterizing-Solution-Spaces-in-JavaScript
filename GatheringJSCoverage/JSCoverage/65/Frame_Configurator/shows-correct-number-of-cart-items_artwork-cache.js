import { Artwork, SearchValues } from "./Artwork.js";

export function retrieve(key) {
    if(key in localStorage) {
        console.log(`Retrieving ${key} from local storage`);
        return JSON.parse(localStorage[key]);
    }
}

export 