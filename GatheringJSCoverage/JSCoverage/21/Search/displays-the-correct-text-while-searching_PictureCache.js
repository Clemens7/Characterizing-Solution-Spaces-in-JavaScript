import { Picture} from './Picture.js';

export function retrieve(objectID) {
    const key = objectID;
    if(key in localStorage) 
}

export function store(objectID, picture) {
    const key = objectID;
    console.log(`Storing ${key} in local storage`);
    localStorage[key] = JSON.stringify(picture);
}