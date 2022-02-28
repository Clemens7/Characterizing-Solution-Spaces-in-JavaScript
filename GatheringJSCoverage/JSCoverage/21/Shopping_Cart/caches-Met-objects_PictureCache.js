import { Picture} from './Picture.js';

export function retrieve(objectID) {
    const key = objectID;
    if(key in localStorage) {
        console.log(`Retrieving ${key} from local storage`);
        return JSON.parse(localStorage[key]);
    }
}

export 